"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import SectionHeader from "@/components/SectionHeader";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export default function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const extension =
    LANGUAGES.find((l) => l.id === language)?.extension || "txt";
  const filename = `solution.${extension}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const getCopyLabel = () => {
    switch (copyStatus) {
      case "copied":
        return "✓ COPIED TO CLIPBOARD";
      case "failed":
        return "✕ COPY BLOCKED, SELECT MANUALLY";
      default:
        return "📋 COPY FIXED CODE";
    }
  };

  return (
    <div className="space-y-3">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-mono text-[11px] font-bold text-[#16A34A] uppercase">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border border-[#111111] bg-[#FDFDFD] shadow-[2px_2px_0px_#111111]">
        {/* Solution Header Strip */}
        <div className="flex items-center justify-between border-b border-[#111111] bg-[#F5F5F3] px-3 py-1.5 font-mono text-xs">
          <span className="font-bold text-[#111111]">{filename}</span>
          <span className="font-bold text-[#16A34A] uppercase text-[10px]">
            READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <div className="p-3 overflow-x-auto bg-[#171717] text-[#F7F3EA]">
          <pre className="font-mono text-xs leading-6">
            <code>{code}</code>
          </pre>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#111111] bg-[#F5F5F3] p-2 font-mono text-xs">
          <button
            type="button"
            onClick={handleCopy}
            className={`border border-[#111111] px-3 py-1.5 font-bold uppercase transition-all cursor-pointer ${
              copyStatus === "copied"
                ? "bg-[#16A34A] text-white"
                : "bg-[#FDFDFD] text-[#111111] hover:bg-[#111111] hover:text-[#FDFDFD]"
            }`}
          >
            {getCopyLabel()}
          </button>
          <button
            type="button"
            onClick={() => onApply(code)}
            className="border border-[#111111] bg-[#111111] px-3 py-1.5 font-bold text-white uppercase hover:bg-[#D94826] transition-all cursor-pointer"
          >
            APPLY TO EDITOR ↵
          </button>
        </div>
      </div>
    </div>
  );
}
