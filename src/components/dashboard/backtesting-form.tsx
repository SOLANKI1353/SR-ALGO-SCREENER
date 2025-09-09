"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Repeat } from "lucide-react";
import { backtestingStrategies } from "@/lib/data";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";

export interface BacktestingFormState {
    strategy: string;
    dateRange: DateRange;
}

interface BacktestingFormProps {
    onRunTest: (data: BacktestingFormState) => void;
    isTesting: boolean;
}

export function BacktestingForm({ onRunTest, isTesting }: BacktestingFormProps) {
  const [strategy, setStrategy] = useState("rsi_ma");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: subDays(new Date(), 90), to: new Date() });

  const handleRunClick = () => {
    if (strategy && dateRange?.from && dateRange?.to) {
      onRunTest({ strategy, dateRange });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Run AI-Powered Backtest</CardTitle>
        <CardDescription>
          Test your trading strategies against historical data using AI analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="strategy">Strategy</Label>
                <Select value={strategy} onValueChange={setStrategy}>
                    <SelectTrigger id="strategy">
                        <SelectValue placeholder="Select a strategy" />
                    </SelectTrigger>
                    <SelectContent>
                        {backtestingStrategies.map(s => (
                            <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="date-range">Date Range</Label>
                <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={handleRunClick} disabled={isTesting || !strategy || !dateRange?.from || !dateRange?.to}>
            <Repeat className="mr-2 h-4 w-4" />
            {isTesting ? 'Running AI Analysis...' : 'Run Backtest'}
        </Button>
      </CardFooter>
    </Card>
  );
}
