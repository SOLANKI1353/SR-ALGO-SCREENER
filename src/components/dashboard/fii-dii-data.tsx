
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fiiDiiData as generateFiiDiiData } from "@/lib/data"
import { Landmark } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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

const months = [
    { value: 0, label: 'January' }, { value: 1, label: 'February' }, { value: 2, label: 'March' }, 
    { value: 3, label: 'April' }, { value: 4, label: 'May' }, { value: 5, label: 'June' },
    { value: 6, label: 'July' }, { value: 7, label: 'August' }, { value: 8, label: 'September' },
    { value: 9, label: 'October' }, { value: 10, label: 'November' }, { value: 11, label: 'December' }
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);


export function FiiDiiData() {
  const [data, setData] = useState<FiiDiiData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const fetchData = (month?: number, year?: number, days?: number) => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setData(generateFiiDiiData(month, year, days));
        setIsLoading(false);
      }, 500);
  };
  
  useEffect(() => {
    // Fetch last 2 days of data by default on initial load
    fetchData(undefined, undefined, 2);
  }, []);

  const handleFetchData = () => {
    fetchData(selectedMonth, selectedYear);
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
                    <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map(m => <SelectItem key={m.value} value={m.value.toString()}>{m.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-1.5">
                    <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                             {years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
                        </SelectContent>
                    </Select>
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
        ) : data ? (
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
            <p>No data available for the selected period.</p>
        )}
      </CardContent>
    </Card>
  )
}
