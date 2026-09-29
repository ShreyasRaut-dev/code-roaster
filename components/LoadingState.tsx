import React from "react";

export default function LoadingState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center font-mono">
      <div className="mb-4 flex h-16 w-16 items-center justify-center border-2 border-[#111111] bg-[#111111] text-2xl font-bold text-white shadow-[3px_3px_0px_#D94826]">
        <span className="animate-spin inline-block">/</span>
      </div>
      <h3 className="mb-2 animate-pulse font-display text-sm font-bold uppercase tracking-wider text-[#D94826]">
        Analyzing Code
      </h3>
      <p className="max-w-xs text-xs leading-relaxed text-gray-500">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}
