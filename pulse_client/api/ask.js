let cachedModels = null;
let cacheTime = 0;

export default async function handler(req, res) {
  // Diagnostic GET route
  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      hasKey: !!process.env.GEMINI_API_KEY,
      modelEnv: process.env.GEMINI_MODEL || null
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  // Parse req.body safely
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    console.error("Failed to parse request body");
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { query = "", context = {} } = body;
  const safeQuery = query.substring(0, 500);
  const startTime = Date.now();

  // 1. Shrink the context
  const validIds = new Set();
  const shrinkItems = (items = []) => {
    return items.map(item => {
      if (item.id) validIds.add(String(item.id));
      const keywords = (item.abstract || item.category || item.grade || "")
        .split(/\s+/)
        .slice(0, 5)
        .join(" ");
      return { id: item.id, title: item.title, keywords };
    });
  };

  const shrunkenContext = {
    datasets: shrinkItems(context.datasets),
    media: shrinkItems(context.media),
    kits: shrinkItems(context.kits)
  };

  const systemPrompt = `You are a polar science guide for Indian students and researchers. 
Answer in 2 short paragraphs, plain language, adjust to any grade level mentioned, never invent statistics. 
Use the provided context to find relevant datasetIds, mediaIds, and kitIds.

Context of available resources:
${JSON.stringify(shrunkenContext)}`;

  const responseSchema = {
    type: "OBJECT",
    properties: {
      answer: { type: "STRING" },
      keyTerms: { type: "ARRAY", items: { type: "STRING" } },
      datasetIds: { type: "ARRAY", items: { type: "STRING" } },
      mediaIds: { type: "ARRAY", items: { type: "STRING" } },
      kitIds: { type: "ARRAY", items: { type: "STRING" } }
    },
    required: ["answer", "keyTerms", "datasetIds", "mediaIds", "kitIds"]
  };

  // 2. Resolve Model List
  const modelsToTry = [];
  if (process.env.GEMINI_MODEL) {
    modelsToTry.push(process.env.GEMINI_MODEL.replace(/^models\//, '').trim());
  }

  if (Date.now() - cacheTime < 3600000 && cachedModels) {
    modelsToTry.push(...cachedModels);
  } else {
    try {
      const abortCtrl = new AbortController();
      const tId = setTimeout(() => abortCtrl.abort(), 3000);
      const listRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=100', {
        headers: { 'x-goog-api-key': apiKey },
        signal: abortCtrl.signal
      });
      clearTimeout(tId);
      
      if (listRes.ok) {
        const listData = await listRes.json();
        const activeFlash = (listData.models || [])
          .filter(m => 
            m.supportedGenerationMethods?.includes("generateContent") &&
            m.name.includes("flash") &&
            !/image|tts|live|audio|embedding|robotics/i.test(m.name)
          )
          .map(m => m.name.replace(/^models\//, ''))
          .sort((a, b) => b.localeCompare(a)); // simple sort newer first
        
        cachedModels = activeFlash;
        cacheTime = Date.now();
        modelsToTry.push(...activeFlash);
      }
    } catch (e) {
      console.error("Model list fetch failed:", e.message);
    }
  }
  
  modelsToTry.push('gemini-2.5-flash', 'gemini-2.5-flash-lite');
  const uniqueModels = [...new Set(modelsToTry)].slice(0, 3);
  const attempts = [];

  // 3. API Execution Loop
  for (const model of uniqueModels) {
    // Hard stop if overall time exceeds ~22s
    if (Date.now() - startTime > 22000) break;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: safeQuery }] }],
          systemInstruction: { role: "system", parts: [{ text: systemPrompt }] },
          generationConfig: { 
            responseMimeType: "application/json",
            responseSchema,
            temperature: 0.4,
            maxOutputTokens: 1024
          }
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errText = await response.text();
        const shortMsg = errText.substring(0, 200).replace(/\n/g, ' ');
        attempts.push({ model, status: response.status, message: shortMsg });
        
        if (response.status === 400 || response.status === 403) {
          console.error(`Fatal API Error (${response.status}) on ${model}: ${shortMsg}`);
          break; // Stop immediately on auth/bad request errors
        }
        continue;
      }

      const data = await response.json();
      let textContent = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      // 4. Defensive Parsing
      textContent = textContent.replace(/```(?:json)?\s*([\s\S]*?)\s*```/ig, '$1').trim();
      const match = textContent.match(/\{[\s\S]*\}/);
      const cleanJson = match ? match[0] : textContent;
      
      const parsed = JSON.parse(cleanJson);
      
      const formatArray = (arr) => Array.isArray(arr) ? arr.map(String) : [];
      const filterValid = (arr) => formatArray(arr).filter(id => validIds.has(id));

      const finalResult = {
        answer: String(parsed.answer || ""),
        keyTerms: formatArray(parsed.keyTerms),
        datasetIds: filterValid(parsed.datasetIds),
        mediaIds: filterValid(parsed.mediaIds),
        kitIds: filterValid(parsed.kitIds),
        source: "gemini",
        model
      };

      return res.status(200).json(finalResult);

    } catch (error) {
      clearTimeout(timeoutId);
      const isTimeout = error.name === 'AbortError';
      const msg = isTimeout ? 'Timeout' : error.message.substring(0, 200);
      attempts.push({ model, status: isTimeout ? 408 : 500, message: msg });
      console.error(`Attempt failed for ${model}: ${msg}`);
    }
  }

  // 5. Total Failure Fallback
  console.error("All Gemini attempts failed. Attempts:", JSON.stringify(attempts));
  res.status(502).json({ 
    error: 'Failed to generate response',
    attempts
  });
}