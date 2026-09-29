import { GoogleGenAI } from "@google/genai";

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    process.exit(1);
  }
  const ai = new GoogleGenAI({ apiKey });
  try {
    const models = await ai.models.list();
    console.log("Available models:");
    for await (const m of models) {
      console.log("-", m.name);
    }
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();
