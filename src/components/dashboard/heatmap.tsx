
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { heatmapData as initialHeatmapData } from "@/lib/data";
import { cn } from "@/lib/utils";

type HeatmapItem = {
    name: string;
    value: number;
    marketCap: string;
};

const getColor = (value: number) => {
  if (value > 2) return "bg-emerald-700 hover:bg-emerald-600";
  if (value > 0) return "bg-emerald-500 hover:bg-emerald-400";
  if (value < -2) return "bg-red-700 hover:bg-red-600";
  if (value < 0) return "bg-red-500 hover:bg-red-400";
  return "bg-muted hover:bg-muted/80";
};

export function Heatmap() {
  const [heatmapData, setHeatmapData] = useState<HeatmapItem[]>(initialHeatmapData);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeatmapData(currentData => 
        currentData.map(sector => ({
          ...sector,
          value: Math.max(-4, Math.min(4, sector.value + (Math.random() - 0.5) * 0.5)),
        }))
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Heatmap</CardTitle>
        <CardDescription>Sector performance at a glance (simulated live data).</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {heatmapData.map((sector) => (
              <Tooltip key={sector.name}>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "rounded-lg p-4 text-white font-bold cursor-pointer transition-colors duration-200 aspect-square flex flex-col justify-between",
                    getColor(sector.value)
                  )}>
                    <div className="text-sm font-semibold">{sector.name}</div>
                    <div className="text-2xl text-right">{sector.value > 0 ? '+' : ''}{sector.value.toFixed(1)}%</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Market Cap: {sector.marketCap}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
