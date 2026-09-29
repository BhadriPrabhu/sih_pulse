export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { query, context } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is missing' });
  }

  const systemPrompt = `You are a polar science guide for Indian students and researchers. 
Answer in 2 short paragraphs, plain language, adjust to any grade level mentioned, never invent statistics. 
Use the provided context to find relevant datasetIds, mediaIds, and kitIds.

Context of available resources:
${JSON.stringify(context)}

Respond strictly in JSON format:
{
  "answer": "Your 2 paragraph answer.",
  "keyTerms": ["term1", "term2"],
  "datasetIds": ["matched_id_1", "matched_id_2"],
  "mediaIds": ["matched_id_1"],
  "kitIds": ["matched_id_1"]
}`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: query }] }],
        systemInstruction: { role: "system", parts: [{ text: systemPrompt }] },
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API rejected request: ${errorText}`);
    }
    
    const data = await response.json();
    
    // 1. Safely extract the text
    let jsonString = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!jsonString) throw new Error("Gemini returned an empty or invalid response format.");

    // 2. Strip any markdown code blocks Gemini might have sneakily added
    jsonString = jsonString.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    // 3. Parse and return
    const result = JSON.parse(jsonString);
    res.status(200).json(result);

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Send the actual error message back to the frontend so you can read it in the Network tab
    res.status(500).json({ 
      error: 'Failed to generate response', 
      details: error.message 
    });
  }
}