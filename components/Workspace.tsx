"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { requestRoast } from "@/lib/api";
import {
  LanguageId,
  ReportState,
  RoastLevel,
  RoastResult,
} from "@/types/roast";
import TopBar from "@/components/TopBar";
import RoastControls from "@/components/RoastControls";
import ErrorMessageInput from "@/components/ErrorMessageInput";
import CodeEditor from "@/components/CodeEditor";
import RoastReport from "@/components/RoastReport";
import StatusBar from "@/components/StatusBar";

export default function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>(SAMPLE.code);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);

  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | undefined>(undefined);

  const isRoasting = reportState === "loading";

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code || !code.trim()) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError(undefined);
    setRoastResult(null);

    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        errorMessage,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err: any) {
      setApiError(err?.message || "Failed to analyze code.");
      setReportState("error");
    }
  }, [code, errorMessage, isRoasting, language, roastLevel]);

  const handleLoadSample = () => {
    setLanguage(SAMPLE.language as LanguageId);
    setCode(SAMPLE.code);
  };

  const handleApplyFix = (fixedCode: string) => {
    setCode(fixedCode);
  };

  // Keyboard shortcut listener: Ctrl+Enter or Cmd+Enter
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [handleRoast]);

  // Compute errorLine: only active when editor contents match the roasted code snapshot
  const errorLine =
    reportState === "results" &&
    code === roastedCode &&
    roastResult?.issues &&
    roastResult.issues.length > 0
      ? roastResult.issues[0].line
      : undefined;

  return (
    <main className="flex w-full max-w-[1360px] min-h-[85vh] flex-col border-2 border-[#111111] bg-[#FDFDFD] shadow-[4px_4px_0px_#111111] overflow-hidden">
      {/* Top Bar with Controls */}
      <TopBar>
        <RoastControls
          roastLevel={roastLevel}
          onRoastLevelChange={setRoastLevel}
          language={language}
          onLanguageChange={setLanguage}
          onRoast={handleRoast}
          isRoasting={isRoasting}
          errorDrawerOpen={errorDrawerOpen}
          onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
        />
      </TopBar>

      {/* Optional Stack Trace Drawer */}
      {errorDrawerOpen && (
        <ErrorMessageInput
          value={errorMessage}
          onChange={setErrorMessage}
          onClose={() => setErrorDrawerOpen(false)}
        />
      )}

      {/* Main Split Area (Code Editor vs Roast Report) */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <CodeEditor
          code={code}
          onChange={setCode}
          language={language}
          errorLine={errorLine}
          onLoadSample={handleLoadSample}
        />
        <RoastReport
          state={reportState}
          roastLevel={roastLevel}
          language={language}
          result={roastResult}
          errorMsg={apiError}
          onRetry={handleRoast}
          onApplyFix={handleApplyFix}
        />
      </div>

      {/* Footer Status Bar */}
      <StatusBar isRoasting={isRoasting} />
    </main>
  );
}
