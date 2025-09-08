import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export type BacktestingResultData = {
    pnl: number;
    winRate: number;
    maxDrawdown: number;
    sharpeRatio: number;
    trades: { ticker: string; type: 'BUY' | 'SELL'; price: number; date: string }[];
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
            <CardTitle>Backtest Results</CardTitle>
            <CardDescription>Performance summary of the selected strategy.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total PnL" value={`₹${results.pnl.toLocaleString('en-IN')}`} isPositive={results.pnl > 0} />
                <StatCard title="Win Rate" value={`${results.winRate}%`} />
                <StatCard title="Max Drawdown" value={`${results.maxDrawdown}%`} isPositive={false} />
                <StatCard title="Sharpe Ratio" value={results.sharpeRatio.toString()} />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Trade Log</h3>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Ticker</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.trades.map((trade, index) => (
                                <TableRow key={index}>
                                    <TableCell>{trade.date}</TableCell>
                                    <TableCell className="font-medium">{trade.ticker}</TableCell>
                                    <TableCell>
                                        <span className={`font-medium ${trade.type === 'BUY' ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {trade.type}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">₹{trade.price.toLocaleString('en-IN')}</TableCell>
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
