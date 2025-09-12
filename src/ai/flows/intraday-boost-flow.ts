'use server';

/**
 * @fileOverview AI-driven intraday stock signal generation.
 *
 * This file defines a Genkit flow that finds a few promising stocks for intraday trading,
 * complete with buy/sell signals, entry prices, targets, and stop-loss levels.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const IntradayBoostOutputSchema = z.object({
  stocks: z.array(z.object({
    ticker: z.string().describe('The ticker symbol of the stock (e.g., INFY, SBIN).'),
    signal: z.enum(['BUY', 'SELL']).describe('The recommended trading signal.'),
    entryPrice: z.number().describe('The suggested entry price for the trade.'),
    rationale: z.string().describe('A brief, 2-sentence rationale for the signal based on intraday technicals.'),
    target: z.number().describe('The recommended target price for the intraday trade.'),
    stopLoss: z.number().describe('The recommended stop-loss price for the intraday trade.'),
  })).describe('A list of 3-4 promising stocks for intraday trading.')
});

export type IntradayBoostOutput = z.infer<typeof IntradayBoostOutputSchema>;

export async function generateIntradayBoost(): Promise<IntradayBoostOutput> {
  return intradayBoostFlow();
}

const intradayBoostPrompt = ai.definePrompt({
  name: 'intradayBoostPrompt',
  output: { schema: IntradayBoostOutputSchema },
  prompt: `You are an expert intraday trader for the Indian stock market (NSE). Your task is to identify 3-4 high-potential intraday trading opportunities for today.

  1.  **Scan the Market**: Look for stocks showing strong intraday momentum, high volume, or breaking key levels.
  2.  **Select Diverse Opportunities**: Choose a mix of both 'BUY' and 'SELL' side opportunities if possible.
  3.  **Generate Actionable Signals**: For each stock, provide a clear 'BUY' or 'SELL' signal.
  4.  **Define Trade Parameters**: Provide a specific 'entryPrice', a 'target' price, and a 'stopLoss' price.
  5.  **Provide Rationale**: Write a concise, 1-2 sentence rationale for each recommendation, focusing on intraday technical patterns (e.g., "Breaking day's high with high volume," "Sustaining below VWAP with selling pressure").

  Your response must be in the structured format defined by the output schema. Do not add any extra commentary.
  `,
});

const intradayBoostFlow = ai.defineFlow(
  {
    name: 'intradayBoostFlow',
    outputSchema: IntradayBoostOutputSchema,
  },
  async () => {
    const { output } = await intradayBoostPrompt();
    return output!;
  }
);
