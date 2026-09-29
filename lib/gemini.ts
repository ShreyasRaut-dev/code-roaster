import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { RoastRequest, RoastResult } from "@/types/roast";
import { buildUserPrompt, ROAST_SYSTEM_INSTRUCTION } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";

function formatFriendlyError(status: number | undefined, message: string): string {
  if (status === 400) {
    return "Invalid request payload or model configuration. Check input formatting.";
  }
  if (status === 403) {
    return "Gemini API key invalid or unauthorized. Please verify GEMINI_API_KEY in .env.local.";
  }
  if (status === 404) {
    return `Model "${AI.model}" not found or unsupported for this API key.`;
  }
  if (status === 429) {
    return "Rate limit exceeded. Too many roast requests — please wait a moment and try again.";
  }
  if (status === 503) {
    return "Gemini service temporarily overloaded. Please try roasting again shortly.";
  }
  return message || "An unexpected error occurred while communicating with Gemini.";
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  let lastError: unknown;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Received empty response from Gemini AI.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        throw new Error("Failed to parse JSON response from Gemini AI.");
      }

      return {
        roast: parsed.roast ?? "Code roast unavailable.",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "",
      };
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.statusCode || err?.response?.status;
      
      // Retry on 503 (service unavailable) if attempts remain
      if ((status === 503 || err?.message?.includes("503")) && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      const friendlyMsg = formatFriendlyError(status, err?.message || String(err));
      throw new Error(friendlyMsg);
    }
  }

  throw new Error(
    lastError instanceof Error ? lastError.message : "Failed to analyze code after retries."
  );
}
