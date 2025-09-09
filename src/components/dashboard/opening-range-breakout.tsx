
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { openingRangeBreakoutData as initialBreakoutData } from "@/lib/data";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type BreakoutStock = {
    ticker: string;
    breakoutPrice: number;
    volume: string;
    time: string;
    breakoutType: 'bullish' | 'bearish';
};

export function OpeningRangeBreakout() {
  const [breakoutData, setBreakoutData] = useState(initialBreakoutData);

  useEffect(() => {
    // This is a placeholder for a live data feed.
    // In a real application, you would use WebSockets or polling.
    const interval = setInterval(() => {
        // Simulate small changes to the data
        setBreakoutData(currentData => ({
            bullish: currentData.bullish.map(stock => ({
                ...stock,
                breakoutPrice: stock.breakoutPrice * (1 + (Math.random() - 0.49) * 0.001)
            })).slice(0, 10), // Keep the list from growing indefinitely
            bearish: currentData.bearish.map(stock => ({
                ...stock,
                breakoutPrice: stock.breakoutPrice * (1 + (Math.random() - 0.51) * 0.001)
            })).slice(0, 10)
        }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Opening Range Breakout</CardTitle>
        <CardDescription>Stocks breaking above or below their initial 15-minute range (simulated).</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bullish">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bullish">
              <ArrowUp className="mr-2 h-4 w-4 text-emerald-500" />
              Bullish Breakout
            </TabsTrigger>
            <TabsTrigger value="bearish">
              <ArrowDown className="mr-2 h-4 w-4 text-red-500" />
              Bearish Breakout
            </TabsTrigger>
          </TabsList>
          <TabsContent value="bullish">
            <BreakoutTable data={breakoutData.bullish} />
          </TabsContent>
          <TabsContent value="bearish">
            <BreakoutTable data={breakoutData.bearish} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function BreakoutTable({ data }: { data: BreakoutStock[] }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticker</TableHead>
            <TableHead>Breakout Type</TableHead>
            <TableHead className="text-right">Breakout Price</TableHead>
            <TableHead className="text-right">Volume</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((stock) => (
            <TableRow key={stock.ticker}>
              <TableCell className="font-medium">{stock.ticker}</TableCell>
              <TableCell>
                <Badge variant={stock.breakoutType === 'bullish' ? 'default' : 'destructive'}>
                  {stock.breakoutType === 'bullish' ? 'Bullish' : 'Bearish'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">₹{stock.breakoutPrice.toFixed(2)}</TableCell>
              <TableCell className="text-right">{stock.volume}</TableCell>
              <TableCell className="text-right">{stock.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
