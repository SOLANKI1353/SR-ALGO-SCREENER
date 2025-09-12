
'use server';

/**
 * @fileOverview AI-powered Fibonacci screener flow.
 *
 * This file defines a Genkit flow that finds a stock exhibiting a significant
 * Fibonacci retracement or extension pattern and provides a trading signal,
 * target, stop-loss, and rationale.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FibonacciScreenerOutputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock that was analyzed.'),
  signal: z.enum(['BUY', 'SELL', 'HOLD']).describe('The AI-generated signal based on the Fibonacci analysis.'),
  fibonacciLevel: z.string().describe('The specific Fibonacci level identified (e.g., "61.8% Retracement", "161.8% Extension").'),
  currentPrice: z.number().describe('The current price of the stock.'),
  rationale: z.string().describe('The rationale behind the signal, explaining the Fibonacci pattern and its implications.'),
  stopLoss: z.number().describe('The recommended stop-loss price.'),
  targetPrice: z.number().describe('The recommended target price.'),
});

export type FibonacciScreenerOutput = z.infer<typeof FibonacciScreenerOutputSchema>;

export async function findFibonacciSignal(): Promise<FibonacciScreenerOutput> {
  return fibonacciScreenerFlow();
}

const fibonacciScreenerPrompt = ai.definePrompt({
  name: 'fibonacciScreenerPrompt',
  output: { schema: FibonacciScreenerOutputSchema },
  prompt: `You are an expert technical analyst specializing in Fibonacci analysis for the Indian stock market (NSE). Your task is to find one compelling trading opportunity based on Fibonacci levels.

  1.  **Select an Asset**: Scan liquid stocks and find one that is currently interacting with a key Fibonacci retracement (e.g., 38.2%, 50%, 61.8%) or extension level (e.g., 127.2%, 161.8%). Look for price action confirming the level, like a bounce or rejection.
  2.  **Analyze the Pattern**: Identify the recent major swing high and swing low used for the Fibonacci drawing. Note the current price's position relative to the identified Fibonacci level.
  3.  **Generate Signal**: Based on the price action at the Fibonacci level, provide a clear 'BUY' (if bouncing off support) or 'SELL' (if getting rejected at resistance) signal.
  4.  **Provide Details**:
      *   State the specific `fibonacciLevel` (e.g., "Bouncing off 61.8% Retracement").
      *   Provide a concise `rationale` explaining the setup.
      *   Set a logical `stopLoss` just below the Fibonacci support (for a buy) or just above the resistance (for a sell).
      *   Set a `targetPrice`, which could be the next Fibonacci level or the previous swing high/low.

  Your response must be structured and only contain the requested information in the output schema.
  `,
});

const fibonacciScreenerFlow = ai.defineFlow(
  {
    name: 'fibonacciScreenerFlow',
    outputSchema: FibonacciScreenerOutputSchema,
  },
  async () => {
    const { output } = await fibonacciScreenerPrompt();
    return output!;
  }
);
