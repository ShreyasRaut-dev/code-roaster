import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center font-mono">
      <div className="mb-4 flex h-16 w-16 items-center justify-center border-2 border-[#D94826] bg-[#FFF5F2] text-2xl font-extrabold text-[#D94826] shadow-[3px_3px_0px_#111111]">
        !
      </div>
      <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-[#D94826]">
        Analysis Failed
      </h3>
      <p className="mb-4 max-w-sm font-mono text-xs leading-relaxed text-gray-600">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="border border-[#111111] bg-[#111111] px-4 py-2 font-mono text-xs font-bold text-white uppercase hover:bg-[#D94826] transition-all shadow-[2px_2px_0px_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
