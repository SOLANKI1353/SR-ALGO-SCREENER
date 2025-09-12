
"use client"

import { useState, useTransition } from "react"
import {
  findFibonacciSignal,
  type FibonacciScreenerOutput,
} from "@/ai/flows/fibonacci-screener-flow"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bot, Zap, TrendingUp, TrendingDown, Info, BarChartHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

export default function FibonacciScreenerPage() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<FibonacciScreenerOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleGenerate() {
    startTransition(async () => {
      setError(null)
      setResult(null)
      try {
        const res = await findFibonacciSignal()
        setResult(res)
      } catch (e) {
        setError("Failed to generate Fibonacci signal. Please try again.")
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
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <BarChartHorizontal /> AI Fibonacci Screener
                </CardTitle>
                <CardDescription>
                Click the button to let the AI find a stock showing a significant Fibonacci pattern with a trading signal.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleGenerate} disabled={isPending} className="w-full max-w-xs">
                <Zap className="mr-2 h-4 w-4" />
                {isPending ? "Scanning for Patterns..." : "Find Fibonacci Signal"}
                </Button>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
                {isPending && <SignalSkeleton />}
                {result && (
                <Card className="w-full bg-muted/50">
                    <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <Link href={`/dashboard/chart?symbol=NSE:${result.ticker}`} className="hover:underline">
                            {result.ticker}
                        </Link>
                        <Badge
                        variant={getSignalBadgeVariant(result.signal)}
                        className="text-lg px-3 py-1"
                        >
                        {result.signal}
                        </Badge>
                    </CardTitle>
                    <CardDescription>
                        Current Price: ₹{result.currentPrice.toLocaleString('en-IN')}
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm font-medium flex items-center gap-1.5"><Info className="h-4 w-4" /> AI Analysis</p>
                        <p className="text-sm text-muted-foreground pl-6">
                            <span className="font-semibold text-foreground">{result.fibonacciLevel}:</span> {result.rationale}
                        </p>
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
    </div>
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
                 <Skeleton className="h-4 w-40 mt-1" />
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
