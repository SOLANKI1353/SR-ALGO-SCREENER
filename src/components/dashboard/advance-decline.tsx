
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { advanceDeclineData } from "@/lib/data";
import { TrendingUp, TrendingDown } from "lucide-react";

export function AdvanceDecline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advance / Decline Ratio</CardTitle>
        <CardDescription>
          A snapshot of market breadth across major indices and sectors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {advanceDeclineData.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-emerald-500">
                    <TrendingUp className="h-4 w-4" />
                    <span>{item.advances}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-red-500">
                    <TrendingDown className="h-4 w-4" />
                    <span>{item.declines}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress
                  value={(item.advances / (item.advances + item.declines)) * 100}
                  className="h-2 [&>div]:bg-emerald-500"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
