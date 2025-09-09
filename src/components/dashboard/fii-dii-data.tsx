
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fiiDiiData } from "@/lib/data"
import { Landmark } from "lucide-react"

const formatCurrency = (value: number) => {
  return `₹${value.toLocaleString('en-IN')} Cr`
}

export function FiiDiiData() {
  const { date, fii, dii } = fiiDiiData;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Landmark /> FII & DII Data
        </CardTitle>
        <CardDescription>
          Institutional activity for {date} (Cash Market).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Buy Value</TableHead>
              <TableHead className="text-right">Sell Value</TableHead>
              <TableHead className="text-right">Net Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">FII</TableCell>
              <TableCell className="text-right text-emerald-500">{formatCurrency(fii.buy)}</TableCell>
              <TableCell className="text-right text-red-500">{formatCurrency(fii.sell)}</TableCell>
              <TableCell className={`text-right font-bold ${fii.net >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {formatCurrency(fii.net)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">DII</TableCell>
              <TableCell className="text-right text-emerald-500">{formatCurrency(dii.buy)}</TableCell>
              <TableCell className="text-right text-red-500">{formatCurrency(dii.sell)}</TableCell>
              <TableCell className={`text-right font-bold ${dii.net >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {formatCurrency(dii.net)}
              </TableCell>
            </TableRow>
             <TableRow>
                <TableCell colSpan={3} className="font-bold text-right">Total Net</TableCell>
                 <TableCell className={`text-right font-bold ${(fii.net + dii.net) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {formatCurrency(fii.net + dii.net)}
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
