
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fiiDiiData } from "@/lib/data"
import { Landmark } from "lucide-react"

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Landmark /> FII & DII Data
        </CardTitle>
        <CardDescription>
          Daily institutional investment activity in Indian markets.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cash">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cash">Cash Market</TabsTrigger>
                <TabsTrigger value="index-futures">Index Futures</TabsTrigger>
                <TabsTrigger value="stock-futures">Stock Futures</TabsTrigger>
            </TabsList>
            <TabsContent value="cash">
                <MarketDataTable data={fiiDiiData.cash} />
            </TabsContent>
            <TabsContent value="index-futures">
                <MarketDataTable data={fiiDiiData.indexFutures} />
            </TabsContent>
            <TabsContent value="stock-futures">
                 <MarketDataTable data={fiiDiiData.stockFutures} />
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
