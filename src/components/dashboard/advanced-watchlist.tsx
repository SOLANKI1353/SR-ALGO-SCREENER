
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, PlusCircle, Search, X, MoreVertical } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initialWatchlists, searchableInstruments, type SearchableInstrument } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "../ui/label";

type WatchlistItem = {
  ticker: string;
  price: number;
  change: string;
  volume: string;
  exchange: 'NSE' | 'BSE' | 'INDEX';
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
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);

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

  const filteredInstruments = useMemo(() => {
    if (!searchQuery) return [];
    const currentWatchlistTickers = new Set(watchlists[activeTab]?.map(s => `${s.ticker}-${s.exchange}`) ?? []);
    return searchableInstruments
      .filter(instrument => 
        instrument.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instrument.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(instrument => !currentWatchlistTickers.has(`${instrument.ticker}-${instrument.exchange}`))
      .slice(0, 50); // Limit results for performance
  }, [searchQuery, watchlists, activeTab]);

  const handleAddInstrument = (instrument: SearchableInstrument) => {
    const newWatchlistItem: WatchlistItem = {
        ticker: instrument.ticker,
        price: instrument.price,
        change: instrument.change,
        volume: instrument.volume,
        exchange: instrument.exchange
    };
    setWatchlists(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newWatchlistItem]
    }));
    setSearchQuery("");
    setIsSearching(false);
  };

  const handleRemoveStock = (ticker: string, exchange: string) => {
    setWatchlists(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter((stock) => !(stock.ticker === ticker && stock.exchange === exchange))
    }));
  };
  
  const handleFocus = () => setIsSearching(true);
  const handleBlur = () => {
    setTimeout(() => {
        if (!searchQuery) {
            setIsSearching(false)
        }
    }, 200);
  };

  const handleCreateWatchlist = () => {
    if (newWatchlistName && !watchlists[newWatchlistName]) {
      setWatchlists(prev => ({ ...prev, [newWatchlistName]: [] }));
      setActiveTab(newWatchlistName);
      setNewWatchlistName("");
      setIsCreateAlertOpen(false);
    }
  };

  const handleDeleteWatchlist = (watchlistName: string) => {
    setWatchlists(prev => {
        const newWatchlists = {...prev};
        delete newWatchlists[watchlistName];
        
        const remainingWatchlists = Object.keys(newWatchlists);
        if(activeTab === watchlistName && remainingWatchlists.length > 0) {
            setActiveTab(remainingWatchlists[0]);
        } else if (remainingWatchlists.length === 0) {
            // Maybe create a default one or show an empty state
        }

        return newWatchlists;
    });
  }


  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b">
        <div className="relative mt-2">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search to add stocks..."
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
      </div>
      
      <div className="flex-1 min-h-0 relative">
        <ScrollArea className="h-full">
            {isSearching ? (
                <div className="p-2">
                    <h3 className="text-sm font-semibold px-2 mb-1">Search Results</h3>
                     <Table>
                        <TableBody>
                            {filteredInstruments.length > 0 ? filteredInstruments.map(instrument => (
                                <TableRow key={`${instrument.ticker}-${instrument.exchange}`} className="cursor-pointer" onClick={() => handleAddInstrument(instrument)}>
                                    <TableCell className="font-medium p-2">
                                      <div>{instrument.ticker}</div>
                                      <div className="text-xs text-muted-foreground">{instrument.name}</div>
                                    </TableCell>
                                    <TableCell className="p-2">
                                        <Badge variant="outline">{instrument.exchange}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right p-2">
                                        <PlusCircle className="h-4 w-4 text-muted-foreground" />
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-muted-foreground p-4">
                                        No instruments found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                     </Table>
                </div>
            ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="p-2">
                    <div className="flex items-center">
                        <TabsList className="grid w-full grid-cols-2">
                            {Object.keys(watchlists).map(listName => (
                                <TabsTrigger key={listName} value={listName}>{listName}</TabsTrigger>
                            ))}
                        </TabsList>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="ml-2">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setIsCreateAlertOpen(true)}>Create New Watchlist</DropdownMenuItem>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete Current Watchlist</DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your '{activeTab}' watchlist.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteWatchlist(activeTab)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {Object.keys(watchlists).map(listName => (
                        <TabsContent key={listName} value={listName}>
                            <WatchlistTable watchlist={watchlists[listName]} onRemoveStock={handleRemoveStock} />
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </ScrollArea>
      </div>
      <AlertDialog open={isCreateAlertOpen} onOpenChange={setIsCreateAlertOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Create New Watchlist</AlertDialogTitle>
            <AlertDialogDescription>
                Enter a name for your new watchlist.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-2 py-2">
                <Label htmlFor="watchlist-name">Watchlist Name</Label>
                <Input 
                    id="watchlist-name" 
                    value={newWatchlistName}
                    onChange={(e) => setNewWatchlistName(e.target.value)}
                    placeholder="e.g., 'My Favourites'"
                />
            </div>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setNewWatchlistName("")}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCreateWatchlist}>Create</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function WatchlistTable({ watchlist, onRemoveStock }: { watchlist: WatchlistItem[], onRemoveStock: (ticker: string, exchange: string) => void }) {
    if (watchlist.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p>This watchlist is empty.</p>
                <p className="text-sm">Use the search bar to add stocks.</p>
            </div>
        )
    }
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
                <TableRow key={`${stock.ticker}-${stock.exchange}`}>
                  <TableCell className="font-medium p-2">
                     <Link href={`/dashboard/chart?symbol=${stock.exchange}:${stock.ticker}`} className="hover:underline">
                        <div>{stock.ticker}</div>
                        <div className="text-xs text-muted-foreground">{stock.exchange}</div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right p-2">₹{stock.price.toFixed(2)}</TableCell>
                  <TableCell className={cn('text-right font-medium p-2', stock.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500')}>{stock.change}</TableCell>
                  <TableCell className="text-right p-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onRemoveStock(stock.ticker, stock.exchange)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    )
}

    