"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Bot, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  ticker: z.string().min(1, "Ticker is required."),
  movingAverage: z.coerce.number(),
  relativeStrengthIndex: z.coerce.number().min(0).max(100),
  macd: z.coerce.number(),
  volume: z.coerce.number().min(0),
})

export function AiSignals() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<AISignalsFromIndicatorsOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticker: "RELIANCE",
      movingAverage: 2900,
      relativeStrengthIndex: 65,
      macd: 12.5,
      volume: 8100000,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      setError(null)
      setResult(null)
      try {
        const res = await generateAISignalsFromIndicators(values)
        setResult(res)
      } catch (e) {
        setError("Failed to generate AI signal. Please try again.")
        console.error(e)
      }
    })
  }
  
  const getSignalBadgeVariant = (signal: string | undefined) => {
    switch(signal?.toLowerCase()){
        case 'buy': return 'default';
        case 'sell': return 'destructive';
        default: return 'secondary';
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot /> AI Buy/Sell Signals (Demo)
            </CardTitle>
            <CardDescription>
              Get AI-generated trading signals based on technical indicators.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="ticker"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Ticker</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. RELIANCE" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="movingAverage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Moving Average</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="relativeStrengthIndex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RSI</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="macd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MACD</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volume</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit" disabled={isPending}>
              <Zap className="mr-2 h-4 w-4" />
              {isPending ? "Analyzing..." : "Generate Signal"}
            </Button>
            {isPending && <p className="text-sm text-muted-foreground">AI is thinking...</p>}
            {result && (
              <Card className="w-full bg-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>AI Signal:</span>
                    <Badge variant={getSignalBadgeVariant(result.signal)} className="text-lg px-3 py-1">
                      {result.signal}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">Rationale:</p>
                  <p className="text-sm text-muted-foreground">{result.rationale}</p>
                </CardContent>
              </Card>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
