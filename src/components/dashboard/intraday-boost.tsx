"use client"

import { useState, useTransition } from "react"
import {
  generateIntradayBoost,
  type IntradayBoostOutput,
} from "@/ai/flows/intraday-boost-flow"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bot, Zap, TrendingUp, TrendingDown, Info, Gauge } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function IntradayBoost() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<IntradayBoostOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleGenerate() {
    startTransition(async () => {
      setError(null)
      setResult(null)
      try {
        const res = await generateIntradayBoost()
        setResult(res)
      } catch (e) {
        setError("Failed to generate Intraday Boost signals. Please try again.")
        console.error(e)
      }
    })
  }

  const getSignalBadgeVariant = (signal: 'BUY' | 'SELL') => {
    return signal === 'BUY' ? 'default' : 'destructive';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge /> Intraday Boost
        </CardTitle>
        <CardDescription>
          AI-powered intraday stock picks with entry, target, and stop-loss levels.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGenerate} disabled={isPending} className="w-full">
          <Zap className="mr-2 h-4 w-4" />
          {isPending ? "Finding Intraday Stocks..." : "Find Intraday Boost Stocks"}
        </Button>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        {isPending && <Skeleton className="h-40 w-full" />}
        {result && (
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {result.stocks.map((stock, index) => (
              <AccordionItem value={`item-${index}`} key={stock.ticker}>
                <AccordionTrigger>
                  <div className="flex justify-between items-center w-full pr-4">
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg">{stock.ticker}</span>
                      <Badge variant={getSignalBadgeVariant(stock.signal)}>
                        {stock.signal}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Entry: ₹{stock.entryPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 px-1">
                    <p className="text-sm text-muted-foreground">{stock.rationale}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-emerald-500" />
                          <div>
                              <p className="text-muted-foreground">Target</p>
                              <p className="font-semibold">₹{stock.target.toLocaleString('en-IN')}</p>
                          </div>
                      </div>
                       <div className="flex items-center gap-2">
                          <TrendingDown className="h-5 w-5 text-red-500" />
                          <div>
                              <p className="text-muted-foreground">Stop Loss</p>
                              <p className="font-semibold">₹{stock.stopLoss.toLocaleString('en-IN')}</p>
                          </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardFooter>
    </Card>
  )
}
