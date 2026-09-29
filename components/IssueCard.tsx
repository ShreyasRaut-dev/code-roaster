import React from "react";
import { RoastIssue } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

export default function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index + 1).padStart(2, "0");

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "FATAL BUG":
        return {
          badge: "border-[#D94826] bg-[#FFF5F2] text-[#D94826]",
          stripe: "border-l-[#D94826]",
        };
      case "CODE SMELL":
        return {
          badge: "border-[#D97706] bg-[#FEFCE8] text-[#D97706]",
          stripe: "border-l-[#D97706]",
        };
      case "OPTIMIZATION":
        return {
          badge: "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A]",
          stripe: "border-l-[#16A34A]",
        };
      default:
        return {
          badge: "border-[#111111] bg-[#F5F5F3] text-[#111111]",
          stripe: "border-l-[#111111]",
        };
    }
  };

  const style = getSeverityStyle(issue.severity);

  return (
    <div className="border border-[#111111] bg-[#FDFDFD] p-3.5 shadow-[2px_2px_0px_#111111] transition-all">
      {/* Top Meta Bar */}
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E6E2] pb-2 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="bg-[#111111] px-1.5 py-0.5 font-bold text-white text-[10px]">
            #{paddedIndex}
          </span>
          <span className="font-bold uppercase tracking-wider text-[#111111]">
            LINE {issue.line}
          </span>
          <span
            className={`border px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase ${style.badge}`}
          >
            {issue.severity}
          </span>
        </div>
        <span className="font-mono text-xs font-semibold text-[#111111] text-right">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet Box */}
      {issue.codeSnippet && (
        <div
          className={`mb-3 border border-[#E6E6E2] border-l-4 ${style.stripe} bg-[#F5F5F3] p-2.5 overflow-x-auto`}
        >
          <pre className="font-mono text-xs text-[#111111]">
            <code>{issue.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1.5 font-mono text-xs">
        <div className="text-[#D94826]">
          <span className="font-bold">✕ Diagnosis: </span>
          <span>{issue.diagnosis}</span>
        </div>
        <div className="text-[#16A34A]">
          <span className="font-bold">✓ Expected: </span>
          <span>{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
