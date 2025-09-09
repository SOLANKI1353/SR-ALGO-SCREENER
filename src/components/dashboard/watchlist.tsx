
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, PlusCircle } from "lucide-react";
import { initialWatchlist } from "@/lib/data";

type WatchlistItem = {
  ticker: string;
  price: number;
  change: string;
  volume: string;
};

// Function to generate a random update for a stock
const generateRandomUpdate = (stock: WatchlistItem): WatchlistItem => {
    const priceChange = (Math.random() - 0.49) * 10;
    const newPrice = Math.max(10, stock.price + priceChange);
    const percentageChange = ((newPrice - stock.price) / stock.price) * 100;
    
    return {
        ...stock,
        price: newPrice,
        change: `${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(1)}%`,
        volume: `${(parseFloat(stock.volume) + Math.random() * 0.1 - 0.05).toFixed(1)}M`
    }
}


export function Watchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(initialWatchlist);
  const [newTicker, setNewTicker] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
        setWatchlist(currentWatchlist => 
            currentWatchlist.map(stock => generateRandomUpdate(stock))
        );
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);


  const handleAddStock = () => {
    if (newTicker.trim() !== "") {
      const newStock: WatchlistItem = {
        ticker: newTicker.trim().toUpperCase(),
        price: Math.random() * 2000 + 500, // Dummy price
        change: `${(Math.random() > 0.5 ? '+' : '-')}${(Math.random() * 5).toFixed(1)}%`, // Dummy change
        volume: `${(Math.random() * 10).toFixed(1)}M`, // Dummy volume
      };
      setWatchlist([...watchlist, newStock]);
      setNewTicker("");
    }
  };

  const handleRemoveStock = (ticker: string) => {
    setWatchlist(watchlist.filter((stock) => stock.ticker !== ticker));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Watchlist</CardTitle>
        <CardDescription>Your curated list of stocks to watch (simulated live data).</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
          <Input 
            type="text" 
            placeholder="e.g. RELIANCE" 
            value={newTicker} 
            onChange={(e) => setNewTicker(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddStock()}
          />
          <Button type="button" onClick={handleAddStock}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticker</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">Volume</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {watchlist.map((stock) => (
                <TableRow key={stock.ticker}>
                  <TableCell className="font-medium">{stock.ticker}</TableCell>
                  <TableCell className="text-right">{stock.price.toFixed(2)}</TableCell>
                  <TableCell className={`text-right font-medium ${stock.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{stock.change}</TableCell>
                  <TableCell className="text-right">{stock.volume}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveStock(stock.ticker)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
