import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export default function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t border-[#111111] bg-[#F5F5F3] font-mono text-[11px]">
      {/* Top Status Line */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-[#E6E6E2]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-500 uppercase">STATUS:</span>
          {isRoasting ? (
            <span className="font-bold text-[#D97706] animate-pulse">
              PROCESSING...
            </span>
          ) : (
            <span className="font-bold text-[#16A34A]">
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden sm:inline text-gray-400">|</span>
          <span className="hidden sm:inline text-gray-500 font-semibold">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>
        <div className="font-bold uppercase tracking-widest text-[#111111]">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Mandatory Workshop Tagline Line */}
      <div className="bg-[#FDFDFD] py-1.5 text-center text-[10px] font-semibold text-gray-500 tracking-wide">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
