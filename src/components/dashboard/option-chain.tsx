
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { optionChainData } from "@/lib/data"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type Option = {
  strike: number;
  oi: string;
  volume: string;
  iv: string;
  ltp: string;
};

type OptionsData = {
  calls: Option[];
  puts: Option[];
};

export function OptionChain() {
  const [symbol, setSymbol] = useState("NIFTY")
  const [inputSymbol, setInputSymbol] = useState("NIFTY")
  const [data, setData] = useState<OptionsData | null>(optionChainData[symbol as keyof typeof optionChainData]?.options ?? null)
  const [underlyingPrice, setUnderlyingPrice] = useState<number | null>(optionChainData[symbol as keyof typeof optionChainData]?.underlyingPrice ?? null)
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    const upperSymbol = inputSymbol.toUpperCase();
    // Simulate API call
    setTimeout(() => {
        const result = optionChainData[upperSymbol as keyof typeof optionChainData];
        if (result) {
            setSymbol(upperSymbol);
            setData(result.options);
            setUnderlyingPrice(result.underlyingPrice);
        } else {
            setData(null);
            setUnderlyingPrice(null);
        }
        setIsLoading(false);
    }, 1000);
  }

  const isITM = (strike: number, type: 'call' | 'put') => {
      if (!underlyingPrice) return false;
      if (type === 'call') return strike < underlyingPrice;
      return strike > underlyingPrice;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
                <CardTitle>Option Chain</CardTitle>
                <CardDescription>
                    Live option chain data for stocks and indices. Underlying Price for {symbol}: 
                    <span className="font-bold text-primary ml-1">
                        {underlyingPrice ? `₹${underlyingPrice.toFixed(2)}` : 'N/A'}
                    </span>
                </CardDescription>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                    type="text" 
                    placeholder="e.g. NIFTY, RELIANCE"
                    value={inputSymbol}
                    onChange={(e) => setInputSymbol(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={isLoading}>{isLoading ? 'Loading...' : 'Search'}</Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
            <OptionChainSkeleton />
        ) : !data ? (
            <div className="text-center py-12 text-muted-foreground">
                <p>No data found for symbol "{inputSymbol.toUpperCase()}".</p>
                <p className="text-sm">Try NIFTY, BANKNIFTY, or RELIANCE.</p>
            </div>
        ) : (
        <div className="overflow-x-auto">
            <div className="flex justify-between font-bold text-lg mb-2 px-4">
                <h3 className="w-full text-center text-emerald-500">CALLS</h3>
                <div className="w-40 text-center"></div>
                <h3 className="w-full text-center text-red-500">PUTS</h3>
            </div>
            <Table className="min-w-[1200px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">OI</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead className="text-right">IV</TableHead>
                    <TableHead className="text-right">LTP</TableHead>
                    <TableHead className="text-center w-40 bg-muted">Strike</TableHead>
                    <TableHead className="text-right">LTP</TableHead>
                    <TableHead className="text-right">IV</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead className="text-right">OI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.calls.map((call, index) => {
                    const put = data.puts[index];
                    return (
                        <TableRow key={call.strike}>
                            {/* Call Options */}
                            <TableCell className={cn("text-right", isITM(call.strike, 'call') && 'bg-amber-100/50 dark:bg-amber-900/20')}>{call.oi}</TableCell>
                            <TableCell className={cn("text-right", isITM(call.strike, 'call') && 'bg-amber-100/50 dark:bg-amber-900/20')}>{call.volume}</TableCell>
                            <TableCell className={cn("text-right", isITM(call.strike, 'call') && 'bg-amber-100/50 dark:bg-amber-900/20')}>{call.iv}</TableCell>
                            <TableCell className={cn("text-right font-medium", isITM(call.strike, 'call') && 'bg-amber-100/50 dark:bg-amber-900/20')}>{call.ltp}</TableCell>

                            {/* Strike Price */}
                            <TableCell className="text-center font-bold bg-muted w-40">{call.strike}</TableCell>

                            {/* Put Options */}
                            <TableCell className={cn("text-right font-medium", isITM(put.strike, 'put') && 'bg-amber-100/50 dark:bg-amber-900/20')}>{put.ltp}</TableCell>
                            <TableCell className={cn("text-right", isITM(put.strike, 'put') && 'bg-amber-100/50 dark:bg-amber-900/20')}>{put.iv}</TableCell>
                            <TableCell className={cn("text-right", isITM(put.strike, 'put') && 'bg-amber-100/50 dark:bg-amber-900/20')}>{put.volume}</TableCell>
                            <TableCell className={cn("text-right", isITM(put.strike, 'put') && 'bg-amber-100/50 dark:bg-amber-900/20')}>{put.oi}</TableCell>
                        </TableRow>
                    )
                  })}
                </TableBody>
            </Table>
        </div>
        )}
      </CardContent>
    </Card>
  )
}

function OptionChainSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
            </div>
            <div className="border rounded-md p-2 space-y-2">
                <Skeleton className="h-10 w-full" />
                {Array.from({length: 10}).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full" />
                ))}
            </div>
        </div>
    )
}
