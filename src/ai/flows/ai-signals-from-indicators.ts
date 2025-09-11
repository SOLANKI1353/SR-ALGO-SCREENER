'use server';

/**
 * @fileOverview AI-driven buy/sell signal generation for stocks and options.
 *
 * This file defines a Genkit flow that finds a promising stock or option and returns
 * AI-generated buy/sell signals, including stop loss and target price.
 * It uses an LLM to find a trading opportunity, interpret its indicators, and provide actionable insights.
 *
 * @file        ai-signals-from-indicators.ts
 * @exports   AISignalsFromIndicatorsOutput
 * @exports   generateAISignalsFromIndicators
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Output schema for the AI signals generation flow.
 */
const AISignalsFromIndicatorsOutputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock or option that was analyzed (e.g., RELIANCE, NIFTY 24200 CE).'),
  signal: z
    .string()
    .describe(
      'The AI-generated buy/sell signal (e.g., Buy, Sell, Hold) based on the indicators.'
    ),
  rationale: z
    .string()
    .describe('The rationale behind the generated signal, explaining why the AI recommends it.'),
  stopLoss: z.number().describe('The recommended stop loss price for the trade.'),
  targetPrice: z.number().describe('The recommended target price for the trade.'),
});

/**
 * @typedef {object} AISignalsFromIndicatorsOutput
 * @property {string} ticker - The ticker symbol of the analyzed asset.
 * @property {string} signal - The AI-generated buy/sell signal.
 * @property {string} rationale - The rationale behind the signal.
 * @property {number} stopLoss - The recommended stop loss price.
 * @property {number} targetPrice - The recommended target price.
 */
export type AISignalsFromIndicatorsOutput = z.infer<
  typeof AISignalsFromIndicatorsOutputSchema
>;

/**
 * Generates AI buy/sell signals for a trading opportunity of the day.
 *
 * @returns {Promise<AISignalsFromIndicatorsOutput>} A promise that resolves to an object containing the AI-generated signal, rationale, stop loss, and target price.
 */
export async function generateAISignalsFromIndicators(): Promise<AISignalsFromIndicatorsOutput> {
  return aiSignalsFromIndicatorsFlow();
}

const aiSignalsFromIndicatorsPrompt = ai.definePrompt({
  name: 'aiSignalsFromIndicatorsPrompt',
  output: {schema: AISignalsFromIndicatorsOutputSchema},
  prompt: `You are an AI-powered financial analyst. Your task is to identify one promising trading opportunity from the Indian stock market (NSE/BSE). This could be a stock or a stock/index option.

  1.  **Select an Asset**: Choose a well-known, liquid stock or a specific option contract (e.g., NIFTY 24500 CE, RELIANCE 3000 PE) that is currently exhibiting interesting technical patterns (e.g., breakout, reversal, strong trend, high open interest).
  2.  **Analyze**: Briefly analyze the asset based on key technical indicators like Moving Averages, RSI, MACD, Volume, or Open Interest for options.
  3.  **Generate Signal**: Provide a clear buy, sell, or hold signal.
  4.  **Provide Rationale**: Explain your reasoning in 2-3 sentences.
  5.  **Set Levels**: Provide a specific 'stopLoss' price and a 'targetPrice'.

  Your response must be structured and only contain the requested information. Do not add any extra commentary.`,
});

const aiSignalsFromIndicatorsFlow = ai.defineFlow(
  {
    name: 'aiSignalsFromIndicatorsFlow',
    outputSchema: AISignalsFromIndicatorsOutputSchema,
  },
  async () => {
    const {output} = await aiSignalsFromIndicatorsPrompt();
    return output!;
  }
);
