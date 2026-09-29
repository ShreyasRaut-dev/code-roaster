import { NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel } from "@/types/roast";

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body provided." },
      { status: 400 }
    );
  }

  const code = typeof body.code === "string" ? body.code : "";
  const errorMessage =
    typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

  if (!code || !code.trim()) {
    return NextResponse.json({ error: "No code provided." }, { status: 400 });
  }

  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  const validLanguages = LANGUAGES.map((l) => l.id);
  const validRoastLevels = ROAST_LEVELS.map((r) => r.id);

  const language: LanguageId = validLanguages.includes(body.language)
    ? body.language
    : DEFAULTS.language;

  const roastLevel: RoastLevel = validRoastLevels.includes(body.roastLevel)
    ? body.roastLevel
    : DEFAULTS.roastLevel;

  try {
    const result = await analyzeCode({
      language,
      code,
      roastLevel,
      errorMessage,
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("API /api/roast error:", error);
    return NextResponse.json(
      {
        error:
          error?.message || "An error occurred while generating the code roast.",
      },
      { status: 500 }
    );
  }
}
