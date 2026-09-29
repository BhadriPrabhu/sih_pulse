export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { query, context } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is missing' });
  }

  // Try standard active model names in order of preference
  const modelsToTry = [
    process.env.GEMINI_MODEL?.replace(/^models\//, ''),
    'gemini-3.8-flash',
    'gemini-2.5-flash',
    'gemini-1.5-flash'
  ].filter(Boolean);

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

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`, {
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
        throw new Error(`Model ${modelName} rejected request: ${errorText}`);
      }
      
      const data = await response.json();
      let jsonString = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!jsonString) throw new Error(`Model ${modelName} returned empty text.`);

      jsonString = jsonString.replace(/```json/gi, '').replace(/```/g, '').trim();
      const result = JSON.parse(jsonString);
      
      // Success! Return immediately
      return res.status(200).json(result);

    } catch (err) {
      console.warn(`Attempt with model ${modelName} failed:`, err.message);
      lastError = err;
    }
  }

  // If all model options fail, return details
  res.status(500).json({ 
    error: 'Failed to generate response', 
    details: lastError?.message || 'All model attempts failed.' 
  });
}