import React from "react";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children?: React.ReactNode;
}

export default function TopBar({ children }: TopBarProps) {
  return (
    <header className="flex flex-col gap-3 border-b border-[#111111] bg-[#FDFDFD] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2.5">
        <span className="font-display text-base font-extrabold uppercase tracking-wider text-[#111111]">
          {APP.name}
        </span>
        <span className="border border-[#111111] bg-[#F5F5F3] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#111111]">
          {APP.version}
        </span>
      </div>
      {children && <div className="flex items-center">{children}</div>}
    </header>
  );
}
