
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { optionChainData } from "@/lib/data"
import { Skeleton } from "@/components/ui/skeleton"

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
          <div>
            <h3 className="text-lg font-semibold text-center mb-2">CALLS</h3>
            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>OI</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>IV</TableHead>
                    <TableHead>LTP</TableHead>
                    <TableHead className="text-center bg-muted">Strike</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.calls.map((option) => (
                    <TableRow key={option.strike} className={isITM(option.strike, 'call') ? 'bg-amber-100/50 dark:bg-amber-900/20' : ''}>
                      <TableCell>{option.oi}</TableCell>
                      <TableCell>{option.volume}</TableCell>
                      <TableCell>{option.iv}</TableCell>
                      <TableCell>{option.ltp}</TableCell>
                      <TableCell className="text-center font-bold bg-muted">{option.strike}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-center mb-2">PUTS</h3>
             <div className="overflow-x-auto border rounded-md">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="text-center bg-muted">Strike</TableHead>
                        <TableHead>LTP</TableHead>
                        <TableHead>IV</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>OI</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {data.puts.map((option) => (
                        <TableRow key={option.strike} className={isITM(option.strike, 'put') ? 'bg-amber-100/50 dark:bg-amber-900/20' : ''}>
                        <TableCell className="text-center font-bold bg-muted">{option.strike}</TableCell>
                        <TableCell>{option.ltp}</TableCell>
                        <TableCell>{option.iv}</TableCell>
                        <TableCell>{option.volume}</TableCell>
                        <TableCell>{option.oi}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
          </div>
        </div>
        )}
      </CardContent>
    </Card>
  )
}

function OptionChainSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div>
                <Skeleton className="h-6 w-24 mx-auto mb-2" />
                <div className="border rounded-md p-2 space-y-2">
                    <Skeleton className="h-10 w-full" />
                    {Array.from({length: 10}).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-full" />
                    ))}
                </div>
            </div>
            <div>
                <Skeleton className="h-6 w-24 mx-auto mb-2" />
                <div className="border rounded-md p-2 space-y-2">
                    <Skeleton className="h-10 w-full" />
                    {Array.from({length: 10}).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-full" />
                    ))}
                </div>
            </div>
        </div>
    )
}
