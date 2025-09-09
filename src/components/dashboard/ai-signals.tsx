"use client"

import { useState, useTransition } from "react"
import {
  generateAISignalsFromIndicators,
  type AISignalsFromIndicatorsOutput,
} from "@/ai/flows/ai-signals-from-indicators"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bot, Zap, TrendingUp, TrendingDown, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function AiSignals() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<AISignalsFromIndicatorsOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleGenerate() {
    startTransition(async () => {
      setError(null)
      setResult(null)
      try {
        const res = await generateAISignalsFromIndicators()
        setResult(res)
      } catch (e) {
        setError("Failed to generate AI signal. Please try again.")
        console.error(e)
      }
    })
  }

  const getSignalBadgeVariant = (signal: string | undefined) => {
    switch (signal?.toLowerCase()) {
      case "buy":
        return "default"
      case "sell":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot /> AI Signal of the Day
        </CardTitle>
        <CardDescription>
          Find a promising stock with AI analysis, including target and stop
          loss.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGenerate} disabled={isPending} className="w-full">
          <Zap className="mr-2 h-4 w-4" />
          {isPending ? "Finding & Analyzing Stock..." : "Generate AI Signal of the Day"}
        </Button>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        {isPending && <SignalSkeleton />}
        {result && (
          <Card className="w-full bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {result.ticker}
                </span>
                <Badge
                  variant={getSignalBadgeVariant(result.signal)}
                  className="text-lg px-3 py-1"
                >
                  {result.signal}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium flex items-center gap-1.5"><Info className="h-4 w-4" /> Rationale</p>
                <p className="text-sm text-muted-foreground pl-6">{result.rationale}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                    <div>
                        <p className="text-muted-foreground">Stop Loss</p>
                        <p className="font-semibold">₹{result.stopLoss.toLocaleString('en-IN')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    <div>
                        <p className="text-muted-foreground">Target Price</p>
                        <p className="font-semibold">₹{result.targetPrice.toLocaleString('en-IN')}</p>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardFooter>
    </Card>
  )
}


function SignalSkeleton() {
    return (
        <Card className="w-full bg-muted/50">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-8 w-16" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
