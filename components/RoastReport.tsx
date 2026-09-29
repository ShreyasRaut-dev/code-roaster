import React from "react";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import SectionHeader from "@/components/SectionHeader";
import IssueCard from "@/components/IssueCard";
import FixedCode from "@/components/FixedCode";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export default function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const renderContent = () => {
    switch (state) {
      case "empty":
        return <EmptyState />;
      case "loading":
        return <LoadingState />;
      case "error":
        return <ErrorState error={errorMsg} onRetry={onRetry} />;
      case "results": {
        if (!result) return <EmptyState />;

        const hasFix = Boolean(result.correctedCode && result.correctedCode.trim());
        const hasTakeaway = Boolean(result.takeaway && result.takeaway.trim());
        const takeawaySectionNum = hasFix ? 4 : 3;
        const issueCount = result.issues ? result.issues.length : 0;

        return (
          <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-5">
            {/* Section 1: Roast */}
            <div className="space-y-2.5">
              <SectionHeader number={1} title="Roast">
                <span className="font-mono text-[11px] font-bold uppercase text-gray-500">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>
              <div className="border border-[#111111] bg-[#FFF8F0] p-4 shadow-[2px_2px_0px_#111111]">
                <blockquote className="font-mono text-xs font-semibold leading-relaxed text-[#111111]">
                  &ldquo;{result.roast}&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div className="space-y-3">
              <SectionHeader number={2} title="What's Wrong">
                <span className="font-mono text-[11px] font-bold uppercase text-gray-500">
                  {issueCount} {issueCount === 1 ? "ISSUE" : "ISSUES"}
                </span>
              </SectionHeader>
              {issueCount === 0 ? (
                <div className="border border-[#16A34A] bg-[#F0FDF4] p-3.5 font-mono text-xs font-bold text-[#16A34A]">
                  No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix (Conditional) */}
            {hasFix && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Section 3 or 4: Takeaway (Conditional) */}
            {hasTakeaway && (
              <div className="space-y-2.5">
                <SectionHeader number={takeawaySectionNum} title="Takeaway" />
                <div className="border border-[#111111] bg-[#FDFDFD] p-3.5 shadow-[2px_2px_0px_#111111]">
                  <p className="font-mono text-xs font-semibold leading-relaxed text-[#111111]">
                    {result.takeaway}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      }
      default:
        return <EmptyState />;
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-[#FDFDFD] md:w-[46%]">
      {/* Header Strip */}
      <div className="flex h-[40px] items-center justify-between border-b border-[#111111] bg-[#F5F5F3] px-3 font-mono text-xs">
        <span className="text-gray-500 font-bold uppercase tracking-wider text-[11px]">
          AUDIT // REPORT
        </span>
        <span className="font-bold uppercase tracking-widest text-[#111111]">
          Roast Report
        </span>
        <div className="w-12" />
      </div>

      {/* Main Content Area */}
      {renderContent()}
    </div>
  );
}
