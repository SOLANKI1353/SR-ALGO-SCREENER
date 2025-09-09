
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Stock = {
    ticker: string;
    price: number;
    change: string;
};

type Sector = {
    name: string;
    stocks: Stock[];
};

interface SectorStocksDialogProps {
  sector: Sector;
  isOpen: boolean;
  onClose: () => void;
}

export function SectorStocksDialog({ sector, isOpen, onClose }: SectorStocksDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{sector.name} Stocks</DialogTitle>
          <DialogDescription>
            Live market data for stocks in the {sector.name.toLowerCase()} sector.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Ticker</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sector.stocks.map((stock) => (
                <TableRow key={stock.ticker}>
                  <TableCell className="font-medium">{stock.ticker}</TableCell>
                  <TableCell className="text-right">₹{stock.price.toFixed(2)}</TableCell>
                  <TableCell className={`text-right font-medium ${stock.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stock.change}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
