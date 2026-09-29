import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export default function SectionHeader({
  number,
  title,
  children,
}: SectionHeaderProps) {
  const paddedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between border-b border-[#111111] bg-[#FDFDFD] px-4 py-2.5">
      <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111]">
        <span className="text-[#D94826]">{paddedNumber}</span> // {title}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
