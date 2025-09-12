
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { marketOverviewData } from "@/lib/data";
import { cn } from "@/lib/utils";

export function MarketOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>
          Performance of major indices, commodities, and currencies at a glance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {marketOverviewData.map((index) => (
            <Card key={index.name} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {index.name}
                  </p>
                  <p className="text-xl font-bold">{index.value}</p>
                  <div
                    className={cn(
                      "text-sm font-semibold",
                      index.changeType === "positive"
                        ? "text-emerald-500"
                        : "text-red-500"
                    )}
                  >
                    <span>{index.change}</span>
                    <span className="ml-2">({index.changePercent})</span>
                  </div>
                </div>
                <div className="h-12 w-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={index.chartData}
                      margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id={`color-${index.name.replace(/\s+/g, '')}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={
                              index.changeType === "positive"
                                ? "var(--color-emerald-500)"
                                : "var(--color-red-500)"
                            }
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor={
                              index.changeType === "positive"
                                ? "var(--color-emerald-500)"
                                : "var(--color-red-500)"
                            }
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          borderColor: 'hsl(var(--border))',
                          fontSize: '12px',
                          padding: '4px 8px',
                        }}
                        labelStyle={{ display: 'none' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                        cursor={false}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={
                          index.changeType === "positive"
                            ? "hsl(142.1 76.2% 41.2%)"
                            : "hsl(0 84.2% 60.2%)"
                        }
                        strokeWidth={2}
                        fillOpacity={1}
                        fill={`url(#color-${index.name.replace(/\s+/g, '')})`}
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Define CSS variables for colors to be accessible by the gradient
const colorStyles = `
:root {
  --color-emerald-500: #10b981;
  --color-red-500: #ef4444;
}
`;

if (typeof window !== 'undefined') {
    const styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = colorStyles
    document.head.appendChild(styleSheet)
}
