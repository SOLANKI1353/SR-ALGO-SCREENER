
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, PlusCircle, Search, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initialWatchlists, allStocks } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type WatchlistItem = {
  ticker: string;
  price: number;
  change: string;
  volume: string;
};

// Function to generate a random update for a stock
const generateRandomUpdate = (stock: WatchlistItem): WatchlistItem => {
    const priceChange = (Math.random() - 0.49) * (stock.price * 0.01);
    const newPrice = Math.max(10, stock.price + priceChange);
    const percentageChange = ((newPrice - stock.price) / stock.price) * 100;
    
    return {
        ...stock,
        price: newPrice,
        change: `${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(1)}%`,
        volume: `${(parseFloat(stock.volume) + Math.random() * 0.1 - 0.05).toFixed(1)}M`
    }
}

export function AdvancedWatchlist() {
  const [watchlists, setWatchlists] = useState(initialWatchlists);
  const [activeTab, setActiveTab] = useState(Object.keys(initialWatchlists)[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlists(currentWatchlists => {
        const newWatchlists = { ...currentWatchlists };
        for (const listName in newWatchlists) {
          newWatchlists[listName] = newWatchlists[listName].map(stock => generateRandomUpdate(stock));
        }
        return newWatchlists;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const filteredStocks = useMemo(() => {
    if (!searchQuery) return [];
    const currentWatchlistTickers = new Set(watchlists[activeTab].map(s => s.ticker));
    return allStocks
      .filter(stock => stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(stock => !currentWatchlistTickers.has(stock.ticker))
      .slice(0, 50); // Limit results for performance
  }, [searchQuery, watchlists, activeTab]);

  const handleAddStock = (stock: WatchlistItem) => {
    setWatchlists(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], stock]
    }));
    setSearchQuery("");
    setIsSearching(false);
  };

  const handleRemoveStock = (ticker: string) => {
    setWatchlists(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter((stock) => stock.ticker !== ticker)
    }));
  };
  
  const handleFocus = () => setIsSearching(true);
  const handleBlur = () => {
    // Delay blur to allow click on search results
    setTimeout(() => {
        if (!searchQuery) {
            setIsSearching(false)
        }
    }, 200);
  };


  return (
    <div className="h-full flex flex-col bg-background">
      <CardHeader className="p-4 border-b">
        <CardTitle>Watchlist</CardTitle>
        <div className="relative mt-2">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search to add stock..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {isSearching && (
                 <Button variant="ghost" size="icon" className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2" onClick={() => { setSearchQuery(""); setIsSearching(false); }}>
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
      </CardHeader>
      
      <div className="flex-1 min-h-0 relative">
        <ScrollArea className="h-full">
            {isSearching ? (
                <div className="p-2">
                    <h3 className="text-sm font-semibold px-2 mb-1">Search Results</h3>
                     <Table>
                        <TableBody>
                            {filteredStocks.length > 0 ? filteredStocks.map(stock => (
                                <TableRow key={stock.ticker}>
                                    <TableCell className="font-medium p-2">{stock.ticker}</TableCell>
                                    <TableCell className="text-right p-2">
                                        <Button size="sm" variant="ghost" onClick={() => handleAddStock(stock)}>
                                            <PlusCircle className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell className="text-center text-muted-foreground p-4">
                                        No stocks found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                     </Table>
                </div>
            ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="p-2">
                    <TabsList className="grid w-full grid-cols-2">
                        {Object.keys(watchlists).map(listName => (
                            <TabsTrigger key={listName} value={listName}>{listName}</TabsTrigger>
                        ))}
                    </TabsList>
                    {Object.keys(watchlists).map(listName => (
                        <TabsContent key={listName} value={listName}>
                            <WatchlistTable watchlist={watchlists[listName]} onRemoveStock={handleRemoveStock} />
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </ScrollArea>
      </div>
    </div>
  );
}

function WatchlistTable({ watchlist, onRemoveStock }: { watchlist: WatchlistItem[], onRemoveStock: (ticker: string) => void }) {
    return (
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticker</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {watchlist.map((stock) => (
                <TableRow key={stock.ticker}>
                  <TableCell className="font-medium p-2">
                     <Link href={`/dashboard/chart?symbol=NSE:${stock.ticker}`} className="hover:underline">
                        {stock.ticker}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right p-2">₹{stock.price.toFixed(2)}</TableCell>
                  <TableCell className={cn('text-right font-medium p-2', stock.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500')}>{stock.change}</TableCell>
                  <TableCell className="text-right p-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onRemoveStock(stock.ticker)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    )
}
