import { Type, Schema } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "Hinglish witty critique of the code quality and logic.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of detected issues and bugs in the code.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue occurs.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level of the issue.",
          },
          title: {
            type: Type.STRING,
            description: "Short headline of the issue in Hinglish with emojis.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact snippet of problematic original code.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Hinglish explanation of why this code fails or is flawed.",
          },
          expected: {
            type: Type.STRING,
            description: "Hinglish description of what the correct code should do.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "Complete, bug-free, fixed program code.",
    },
    takeaway: {
      type: Type.STRING,
      description: "Final encouraging takeaway lesson in Hinglish.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
