
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { topMovers as initialTopMovers } from "@/lib/data";
import { ArrowUp, ArrowDown, Activity, TrendingUp, TrendingDown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Mover = {
    ticker: string;
    price: number;
    change: string;
    volume?: string;
    value?: number;
};

type FiftyTwoWeekMover = Mover & {
  high: number;
  low: number;
};

// Function to generate a random update for a stock
const generateRandomUpdate = (stock: Mover): Mover => {
    const priceChange = (Math.random() - 0.49) * (stock.price * 0.01);
    const newPrice = Math.max(10, stock.price + priceChange);
    const percentageChange = ((newPrice - stock.price) / stock.price) * 100;
    
    return {
        ...stock,
        price: newPrice,
        change: `${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(1)}%`,
        volume: stock.volume ? `${(parseFloat(stock.volume) + Math.random() * 0.1 - 0.05).toFixed(1)}M` : undefined
    }
}

export function TopMovers() {
  const [movers, setMovers] = useState(initialTopMovers);

  useEffect(() => {
      const interval = setInterval(() => {
          setMovers(currentMovers => ({
              gainers: currentMovers.gainers.map(stock => generateRandomUpdate(stock)).sort((a, b) => parseFloat(b.change) - parseFloat(a.change)),
              losers: currentMovers.losers.map(stock => generateRandomUpdate(stock)).sort((a, b) => parseFloat(a.change) - parseFloat(b.change)),
              mostActive: currentMovers.mostActive.map(stock => generateRandomUpdate(stock)).sort((a, b) => parseFloat(b.volume!) - parseFloat(a.volume!)),
              fiftyTwoWeekHigh: currentMovers.fiftyTwoWeekHigh.map(stock => generateRandomUpdate(stock) as FiftyTwoWeekMover),
              fiftyTwoWeekLow: currentMovers.fiftyTwoWeekLow.map(stock => generateRandomUpdate(stock) as FiftyTwoWeekMover),
              volumeBuzzers: currentMovers.volumeBuzzers.map(stock => generateRandomUpdate(stock))
          }));
      }, 2500);

      return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Movers</CardTitle>
        <CardDescription>Comprehensive market movers data (simulated live).</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers">
          <TabsList className="h-auto flex-wrap justify-start">
            <TabsTrigger value="gainers"><ArrowUp className="mr-2 h-4 w-4 text-emerald-500" />Gainers</TabsTrigger>
            <TabsTrigger value="losers"><ArrowDown className="mr-2 h-4 w-4 text-red-500" />Losers</TabsTrigger>
            <TabsTrigger value="most-active"><Activity className="mr-2 h-4 w-4" />Most Active</TabsTrigger>
            <TabsTrigger value="52w-high"><TrendingUp className="mr-2 h-4 w-4 text-emerald-500" />52W High</TabsTrigger>
            <TabsTrigger value="52w-low"><TrendingDown className="mr-2 h-4 w-4 text-red-500" />52W Low</TabsTrigger>
            <TabsTrigger value="volume-buzzers"><Zap className="mr-2 h-4 w-4" />Volume Buzzers</TabsTrigger>
          </TabsList>
          <TabsContent value="gainers">
            <MoverTable data={movers.gainers} />
          </TabsContent>
          <TabsContent value="losers">
            <MoverTable data={movers.losers} />
          </TabsContent>
           <TabsContent value="most-active">
            <MoverTable data={movers.mostActive} showVolume />
          </TabsContent>
          <TabsContent value="52w-high">
            <MoverTable data={movers.fiftyTwoWeekHigh} show52W highOrLow="high" />
          </TabsContent>
          <TabsContent value="52w-low">
            <MoverTable data={movers.fiftyTwoWeekLow} show52W highOrLow="low" />
          </TabsContent>
           <TabsContent value="volume-buzzers">
            <MoverTable data={movers.volumeBuzzers} showVolume />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface MoverTableProps {
  data: Mover[];
  showVolume?: boolean;
  show52W?: boolean;
  highOrLow?: 'high' | 'low';
}

function MoverTable({ data, showVolume = false, show52W = false, highOrLow = 'high' }: MoverTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticker</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Change</TableHead>
            {showVolume && <TableHead className="text-right">Volume</TableHead>}
            {show52W && <TableHead className="text-right">52W {highOrLow === 'high' ? 'High' : 'Low'}</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((stock) => (
            <TableRow key={stock.ticker}>
              <TableCell className="font-medium">
                 <Link href={`/dashboard/chart?symbol=NSE:${stock.ticker}`} className="hover:underline">
                    {stock.ticker}
                </Link>
              </TableCell>
              <TableCell className="text-right">₹{stock.price.toFixed(2)}</TableCell>
              <TableCell className={cn('text-right font-medium', stock.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500')}>{stock.change}</TableCell>
              {showVolume && <TableCell className="text-right">{stock.volume}</TableCell>}
              {show52W && highOrLow === 'high' && <TableCell className="text-right">₹{(stock as FiftyTwoWeekMover).high.toFixed(2)}</TableCell>}
              {show52W && highOrLow === 'low' && <TableCell className="text-right">₹{(stock as FiftyTwoWeekMover).low.toFixed(2)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
