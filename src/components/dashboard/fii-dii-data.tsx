
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fiiDiiData as generateFiiDiiData } from "@/lib/data"
import { Landmark } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";

const formatCurrency = (value: number) => {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  if (absValue >= 100000) {
    return `${sign}₹${(absValue / 100000).toFixed(2)} Lk Cr`
  }
  return `${sign}₹${absValue.toLocaleString('en-IN')} Cr`
}

type DailyFlows = {
    date: string;
    fii: number;
    dii: number;
};

type FiiDiiData = {
    cash: DailyFlows[];
    indexFutures: DailyFlows[];
    stockFutures: DailyFlows[];
};


const MarketDataTable = ({ data }: { data: DailyFlows[] }) => (
     <div className="overflow-x-auto">
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">FII Net Flow</TableHead>
                <TableHead className="text-right">DII Net Flow</TableHead>
                <TableHead className="text-right">Total Net Flow</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((day) => {
                    const totalNet = day.fii + day.dii;
                    return (
                        <TableRow key={day.date}>
                            <TableCell className="font-medium">{day.date}</TableCell>
                            <TableCell className={`text-right font-bold ${day.fii >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {formatCurrency(day.fii)}
                            </TableCell>
                            <TableCell className={`text-right font-bold ${day.dii >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {formatCurrency(day.dii)}
                            </TableCell>
                            <TableCell className={`text-right font-bold ${totalNet >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {formatCurrency(totalNet)}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </div>
);

export function FiiDiiData() {
  const [data, setData] = useState<FiiDiiData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const fetchData = (date?: Date, days?: number) => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setData(generateFiiDiiData(date, days));
        setIsLoading(false);
      }, 500);
  };
  
  useEffect(() => {
    // Fetch last 2 days of data by default on initial load
    fetchData(undefined, 2);
  }, []);

  const handleFetchData = () => {
    fetchData(selectedDate);
  };


  return (
    <Card>
      <CardHeader className="gap-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
                <CardTitle className="flex items-center gap-2">
                  <Landmark /> FII & DII Data
                </CardTitle>
                <CardDescription>
                  Institutional investment activity in Indian markets.
                </CardDescription>
            </div>
             <div className="flex items-end gap-2">
                 <div className="grid gap-1.5">
                    <DatePicker date={selectedDate} setDate={setSelectedDate} />
                </div>
                <Button onClick={handleFetchData} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Fetch'}
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
             <Skeleton className="h-10 w-full" />
             <Skeleton className="h-40 w-full" />
          </div>
        ) : data && data.cash.length > 0 ? (
          <Tabs defaultValue="cash">
              <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="cash">Cash Market</TabsTrigger>
                  <TabsTrigger value="index-futures">Index Futures</TabsTrigger>
                  <TabsTrigger value="stock-futures">Stock Futures</TabsTrigger>
              </TabsList>
              <TabsContent value="cash">
                  <MarketDataTable data={data.cash} />
              </TabsContent>
              <TabsContent value="index-futures">
                  <MarketDataTable data={data.indexFutures} />
              </TabsContent>
              <TabsContent value="stock-futures">
                   <MarketDataTable data={data.stockFutures} />
              </TabsContent>
          </Tabs>
        ) : (
            <p className="text-center py-8 text-muted-foreground">No data available for the selected period.</p>
        )}
      </CardContent>
    </Card>
  )
}
