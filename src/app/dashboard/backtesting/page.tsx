"use client"

import { useState } from "react";
import { BacktestingForm, BacktestingFormState } from "@/components/dashboard/backtesting-form";
import { BacktestingResults, type BacktestingResultData } from "@/components/dashboard/backtesting-results";
import { backtestStrategy } from "@/ai/flows/backtest-strategy-flow";
import { useToast } from "@/hooks/use-toast";

export default function BacktestingPage() {
  const [results, setResults] = useState<BacktestingResultData | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  const handleRunTest = (data: BacktestingFormState) => {
    setIsTesting(true);
    setResults(null);
    
    const promise = backtestStrategy({
        strategy: data.strategy,
        dateRange: {
            from: data.dateRange.from?.toISOString() ?? '',
            to: data.dateRange.to?.toISOString() ?? '',
        }
    });

    promise.then(res => {
        setResults(res);
    }).catch(err => {
        console.error("Backtesting failed", err);
        toast({
            variant: "destructive",
            title: "Backtesting Failed",
            description: "The AI model failed to generate backtesting results. Please try again.",
        });
    }).finally(() => {
        setIsTesting(false);
    });
  };

  return (
    <div className="grid gap-6">
      <BacktestingForm onRunTest={handleRunTest} isTesting={isTesting} />
      { (isTesting || results) && <BacktestingResults results={results} isTesting={isTesting} /> }
    </div>
  );
}
