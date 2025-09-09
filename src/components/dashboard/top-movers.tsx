"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { topMovers } from "@/lib/data";
import { ArrowUp, ArrowDown } from "lucide-react";

export function TopMovers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Movers</CardTitle>
        <CardDescription>Today's biggest market gainers and losers (demo data).</CardDescription>
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
            <MoverTable data={topMovers.gainers} />
          </TabsContent>
          <TabsContent value="losers">
            <MoverTable data={topMovers.losers} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function MoverTable({ data }: { data: typeof topMovers.gainers | typeof topMovers.losers }) {
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
