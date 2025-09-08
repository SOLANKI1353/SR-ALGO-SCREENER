"use client"

import { useState } from "react";
import { BacktestingForm } from "@/components/dashboard/backtesting-form";
import { BacktestingResults, type BacktestingResultData } from "@/components/dashboard/backtesting-results";
import { backtestingResults } from "@/lib/data";

export default function BacktestingPage() {
  const [results, setResults] = useState<BacktestingResultData | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleRunTest = () => {
    setIsTesting(true);
    setResults(null);
    // Simulate API call
    setTimeout(() => {
      setResults(backtestingResults);
      setIsTesting(false);
    }, 1500);
  };

  return (
    <div className="grid gap-6">
      <BacktestingForm onRunTest={handleRunTest} isTesting={isTesting} />
      { (isTesting || results) && <BacktestingResults results={results} isTesting={isTesting} /> }
    </div>
  );
}
