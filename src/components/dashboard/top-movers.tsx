
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { topMovers as initialTopMovers } from "@/lib/data";
import { ArrowUp, ArrowDown } from "lucide-react";

type Mover = {
    ticker: string;
    price: number;
    change: string;
    volume: string;
};

// Function to generate a random update for a stock
const generateRandomUpdate = (stock: Mover): Mover => {
    const priceChange = (Math.random() - 0.48) * 5; // Bias towards positive for gainers, negative for losers
    const newPrice = Math.max(10, stock.price + priceChange);
    const oldPrice = parseFloat(stock.change.match(/(\d+\.?\d*)/)?.[0] || '0');
    const newChangeValue = stock.change.startsWith('+') ? oldPrice + (Math.random() * 0.2) : oldPrice - (Math.random() * 0.2);
    const newChange = `${stock.change.startsWith('+') ? '+' : '-'}${Math.abs(newChangeValue).toFixed(1)}%`

    return {
        ...stock,
        price: newPrice,
        change: newChange
    }
}


export function TopMovers() {
  const [movers, setMovers] = useState(initialTopMovers);

  useEffect(() => {
      const interval = setInterval(() => {
          setMovers(currentMovers => ({
              gainers: currentMovers.gainers.map(stock => generateRandomUpdate(stock)).sort((a, b) => parseFloat(b.change) - parseFloat(a.change)),
              losers: currentMovers.losers.map(stock => generateRandomUpdate(stock)).sort((a, b) => parseFloat(a.change) - parseFloat(b.change)),
          }));
      }, 2500); // Update every 2.5 seconds

      return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Movers</CardTitle>
        <CardDescription>Today's biggest market gainers and losers (simulated live data).</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gainers">
              <ArrowUp className="mr-2 h-4 w-4 text-emerald-500" />
              Gainers
            </TabsTrigger>
            <TabsTrigger value="losers">
              <ArrowDown className="mr-2 h-4 w-4 text-red-500" />
              Losers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="gainers">
            <MoverTable data={movers.gainers} />
          </TabsContent>
          <TabsContent value="losers">
            <MoverTable data={movers.losers} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function MoverTable({ data }: { data: typeof initialTopMovers.gainers | typeof initialTopMovers.losers }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticker</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((stock) => (
            <TableRow key={stock.ticker}>
              <TableCell className="font-medium">{stock.ticker}</TableCell>
              <TableCell className="text-right">{stock.price.toFixed(2)}</TableCell>
              <TableCell className={`text-right font-medium ${stock.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{stock.change}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
