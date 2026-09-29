import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function runCheck() {
  console.log(`Checking Gemini API connection using model: ${AI.model}...`);
  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n✅ Gemini API connection successful!");
    console.log(`Roast snippet: "${result.roast.slice(0, 100)}..."`);
    console.log(`Issues found: ${result.issues.length}`);
    console.log(`Takeaway snippet: "${result.takeaway.slice(0, 80)}..."`);
    process.exit(0);
  } catch (error: any) {
    console.error("\n❌ Gemini API check failed:");
    console.error(error?.message || error);
    process.exit(1);
  }
}

runCheck();
