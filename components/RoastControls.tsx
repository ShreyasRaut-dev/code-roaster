import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export default function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
      {/* Roast Level Selector */}
      <div className="flex items-center gap-2">
        <span className="text-gray-500 font-semibold uppercase tracking-wide text-[11px]">
          Intensity:
        </span>
        <div className="flex items-center gap-1.5 border border-[#111111] bg-[#FDFDFD] p-1">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <button
                key={level.id}
                type="button"
                title={level.description}
                onClick={() => onRoastLevelChange(level.id)}
                className={`group relative flex items-center gap-1.5 px-2 py-1 font-mono text-[11px] font-bold uppercase transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#111111] text-[#FDFDFD]"
                    : "text-[#111111] hover:bg-[#F5F5F3]"
                }`}
              >
                <span
                  className={`inline-block h-2 w-2 rounded-full border border-[#111111] ${
                    isSelected ? "bg-[#D94826]" : "bg-transparent"
                  }`}
                />
                {level.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Language Dropdown */}
      <div className="flex items-center gap-1.5">
        <span className="text-gray-500 font-semibold uppercase tracking-wide text-[11px]">
          Lang:
        </span>
        <div className="relative inline-block">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none border border-[#111111] bg-[#FDFDFD] py-1 pl-2.5 pr-7 font-mono text-[11px] font-bold uppercase text-[#111111] cursor-pointer focus:outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label} (.{lang.extension})
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px]">
            ▼
          </span>
        </div>
      </div>

      {/* Error Message Drawer Toggle */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className={`border border-dashed border-[#111111] px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition-all cursor-pointer ${
          errorDrawerOpen
            ? "bg-[#111111] text-[#FDFDFD]"
            : "bg-[#FDFDFD] text-[#111111] hover:bg-[#F5F5F3]"
        }`}
      >
        {errorDrawerOpen ? "− ERROR TRACEBACK" : "+ ERROR TRACEBACK"}
      </button>

      {/* Primary Action CTA */}
      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className={`flex items-center gap-2 border border-[#111111] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[2px_2px_0px_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer ${
          isRoasting
            ? "bg-gray-400 text-white animate-pulse cursor-not-allowed"
            : "bg-[#111111] text-[#FDFDFD] hover:bg-[#D94826]"
        }`}
      >
        {isRoasting ? (
          "ANALYZING..."
        ) : (
          <>
            <span>ROAST MY CODE</span>
            <span className="bg-[#FDFDFD] text-[#111111] px-1 py-0.5 text-[10px] font-bold">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
}
