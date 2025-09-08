import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Repeat } from "lucide-react";
import { backtestingStrategies } from "@/lib/data";

interface BacktestingFormProps {
    onRunTest: () => void;
    isTesting: boolean;
}

export function BacktestingForm({ onRunTest, isTesting }: BacktestingFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Run Backtest</CardTitle>
        <CardDescription>
          Test your trading strategies against historical data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="strategy">Strategy</Label>
                <Select defaultValue="rsi_ma">
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
                <DatePickerWithRange />
            </div>
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={onRunTest} disabled={isTesting}>
            <Repeat className="mr-2 h-4 w-4" />
            {isTesting ? 'Running Test...' : 'Run Backtest'}
        </Button>
      </CardFooter>
    </Card>
  );
}
