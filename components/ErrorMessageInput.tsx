import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export default function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="border-b border-[#111111] bg-[#F5F5F3] p-3 transition-all">
      <div className="mb-1.5 flex items-center justify-between">
        <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#D94826]">
          + Attach Terminal Traceback / Compiler Error (Optional)
        </label>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-[11px] font-semibold text-[#111111] hover:text-[#D94826] cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        placeholder="e.g. TypeError: unsupported operand type(s) for +=: 'int' and 'list' on line 6..."
        className="w-full border border-[#111111] bg-[#FDFDFD] p-2.5 font-mono text-xs text-[#111111] placeholder:text-[#888888] focus:outline-none focus:ring-1 focus:ring-[#111111]"
      />
    </div>
  );
}
