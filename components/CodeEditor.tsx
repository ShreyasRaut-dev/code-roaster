"use client";

import React, { useRef, useState, useCallback, useTransition } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export default function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const [isPending, startTransition] = useTransition();
  const [cursor, setCursor] = useState({ line: 1, col: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 10);
  const currentLanguageLabel =
    LANGUAGES.find((l) => l.id === language)?.label || language;

  const handleSelect = useCallback(() => {
    if (!textareaRef.current) return;
    const { value, selectionStart } = textareaRef.current;
    const textBefore = value.slice(0, selectionStart);
    const lineNum = textBefore.split("\n").length;
    const lastNewlineIdx = textBefore.lastIndexOf("\n");
    const colNum = lastNewlineIdx === -1 ? selectionStart + 1 : selectionStart - lastNewlineIdx;
    setCursor({ line: lineNum, col: colNum });
  }, []);

  const handleScroll = useCallback(() => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + "    " + code.substring(end);
      onChange(newCode);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <div className="flex flex-1 flex-col border-b border-[#111111] bg-[#FDFDFD] md:border-b-0 md:border-r">
      {/* Editor Header Strip */}
      <div className="flex h-[40px] items-center justify-between border-b border-[#111111] bg-[#F5F5F3] px-3 font-mono text-xs">
        <span className="text-gray-500 font-bold uppercase tracking-wider text-[11px]">
          INPUT // SRC
        </span>
        <span className="font-bold uppercase tracking-widest text-[#111111]">
          Your Code
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLoadSample}
            className="font-bold text-[#D94826] hover:underline uppercase text-[11px] cursor-pointer"
          >
            SAMPLE BUG
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="font-bold text-gray-600 hover:text-[#111111] hover:underline uppercase text-[11px] cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Code Input & Gutter Container */}
      <div className="relative flex flex-1 overflow-hidden font-mono text-xs leading-6">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          className="select-none border-r border-[#E6E6E2] bg-[#F5F5F3] py-3 text-right font-mono text-gray-400 overflow-hidden"
          style={{ minWidth: "44px" }}
        >
          {Array.from({ length: lineCount }).map((_, idx) => {
            const lineNum = idx + 1;
            const isError = errorLine === lineNum;
            return (
              <div
                key={lineNum}
                className={`px-2 h-6 ${
                  isError
                    ? "bg-[#D94826] text-white font-bold"
                    : "hover:text-[#111111]"
                }`}
              >
                {String(lineNum).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Code Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => {
            const val = e.target.value;
            startTransition(() => onChange(val));
          }}
          onSelect={handleSelect}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          placeholder="// Paste your code here (Ctrl+Enter to roast)..."
          spellCheck={false}
          className="flex-1 resize-none bg-transparent p-3 font-mono text-xs leading-6 text-[#111111] placeholder:text-gray-400 focus:outline-none whitespace-pre overflow-auto"
        />
      </div>

      {/* Editor Footer Overlay */}
      <div className="hidden sm:flex h-[28px] items-center justify-between border-t border-[#E6E6E2] bg-[#F5F5F3] px-3 font-mono text-[11px] text-gray-500">
        <div>
          Ln {cursor.line}, Col {cursor.col} · {currentLanguageLabel}
        </div>
        <div>UTF-8 · Tab Size: 4</div>
      </div>
    </div>
  );
}
