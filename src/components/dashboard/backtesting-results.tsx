import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type BacktestingResultData = {
    analysis: string;
    pnl: number;
    winRate: number;
    maxDrawdown: number;
    sharpeRatio: number;
    trades: { 
        ticker: string; 
        type: 'BUY' | 'SELL'; 
        price: number; 
        date: string;
        rationale: string;
    }[];
};

interface BacktestingResultsProps {
    results: BacktestingResultData | null;
    isTesting: boolean;
}

export function BacktestingResults({ results, isTesting }: BacktestingResultsProps) {
  if (isTesting) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
                 <Skeleton className="h-20 w-full" />
                <div>
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </CardContent>
        </Card>
    );
  }

  if (!results) {
    return null;
  }
  
  return (
    <Card>
        <CardHeader>
            <CardTitle>AI Backtest Results</CardTitle>
            <CardDescription>AI-generated performance summary of the selected strategy.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total PnL" value={`₹${results.pnl.toLocaleString('en-IN')}`} isPositive={results.pnl > 0} />
                <StatCard title="Win Rate" value={`${results.winRate}%`} />
                <StatCard title="Max Drawdown" value={`${results.maxDrawdown}%`} isPositive={false} />
                <StatCard title="Sharpe Ratio" value={results.sharpeRatio.toFixed(2)} />
            </div>

            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>AI Strategy Analysis</AlertTitle>
                <AlertDescription>
                   {results.analysis}
                </AlertDescription>
            </Alert>

            <div>
                <h3 className="text-lg font-semibold mb-2">AI-Generated Trade Log</h3>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Ticker</TableHead>
                                <TableHead>Signal</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>AI Rationale</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.trades.map((trade, index) => (
                                <TableRow key={index}>
                                    <TableCell>{trade.date}</TableCell>
                                    <TableCell className="font-medium">{trade.ticker}</TableCell>
                                    <TableCell>
                                        <Badge variant={trade.type === 'BUY' ? 'default' : 'destructive'}>
                                            {trade.type === 'BUY' ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                                            {trade.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>₹{trade.price.toLocaleString('en-IN')}</TableCell>
                                    <TableCell className="text-muted-foreground text-xs">{trade.rationale}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}

const StatCard = ({ title, value, isPositive }: { title: string, value: string, isPositive?: boolean }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className={`text-2xl font-bold ${isPositive === true ? 'text-emerald-500' : isPositive === false ? 'text-red-500' : ''}`}>
                {value}
            </div>
        </CardContent>
    </Card>
);
