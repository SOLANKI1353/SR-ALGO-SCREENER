
"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { sectoralFlowData } from "@/lib/data";
import { TrendingUp, TrendingDown, ChevronsRight } from "lucide-react";
import { SectorStocksDialog } from "./sector-stocks-dialog";
import { Button } from "@/components/ui/button";

type Stock = {
    ticker: string;
    price: number;
    change: string;
};

type Sector = {
    name: string;
    value: number;
    stocks: Stock[];
};

export function SectoralFlow() {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);

  const handleSectorClick = (sector: Sector) => {
    setSelectedSector(sector);
  };

  const handleDialogClose = () => {
    setSelectedSector(null);
  };
  
  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Sectoral Flow</CardTitle>
        <CardDescription>
          Visualize where the money is flowing in the market. Click a sector for details.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Top Buying Sectors
          </h3>
          <div className="space-y-4">
            {sectoralFlowData.topBuying.map((sector) => (
              <SectorItem key={sector.name} sector={sector} onSectorClick={handleSectorClick} isBuying />
            ))}
          </div>
        </div>
        <div>
           <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <TrendingDown className="h-5 w-5 text-red-500" />
            Top Selling Sectors
          </h3>
          <div className="space-y-4">
            {sectoralFlowData.topSelling.map((sector) => (
              <SectorItem key={sector.name} sector={sector} onSectorClick={handleSectorClick} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
     {selectedSector && (
        <SectorStocksDialog
          sector={selectedSector}
          isOpen={!!selectedSector}
          onClose={handleDialogClose}
        />
      )}
    </>
  );
}

interface SectorItemProps {
    sector: Sector;
    isBuying?: boolean;
    onSectorClick: (sector: Sector) => void;
}

function SectorItem({ sector, isBuying = false, onSectorClick }: SectorItemProps) {
    return (
        <div className="group rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => onSectorClick(sector)}>
            <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{sector.name}</span>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    View Stocks <ChevronsRight className="h-4 w-4 ml-1" />
                </Button>
            </div>
            <Progress
                value={sector.value}
                className={`h-2 ${isBuying ? '[&>div]:bg-emerald-500' : '[&>div]:bg-red-500'}`}
            />
        </div>
    );
}
