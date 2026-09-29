import React from "react";

export default function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center font-mono">
      <div className="mb-4 flex h-16 w-16 items-center justify-center border-2 border-dashed border-[#111111] bg-[#F5F5F3] text-2xl font-bold text-gray-400">
        {"{}"}
      </div>
      <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-[#111111]">
        Awaiting Code Submission
      </h3>
      <p className="max-w-xs text-xs leading-relaxed text-gray-500">
        Paste your code on the left, then click &quot;ROAST MY CODE&quot; or press
        Ctrl+Enter (⌘+Enter on Mac).
      </p>
    </div>
  );
}
