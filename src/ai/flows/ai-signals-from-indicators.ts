'use server';

/**
 * @fileOverview AI-driven buy/sell signal generation for a specific stock or option.
 *
 * This file defines a Genkit flow that takes a ticker symbol and returns
 * AI-generated buy/sell signals, including stop loss and target price.
 * It uses an LLM to interpret technical indicators and provide actionable insights for the given asset.
 *
 * @file        ai-signals-from-indicators.ts
 * @exports   AISignalsFromIndicatorsInput
 * @exports   AISignalsFromIndicatorsOutput
 * @exports   generateAISignalsFromIndicators
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for the AI signals generation flow.
 */
const AISignalsFromIndicatorsInputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock or option to analyze (e.g., RELIANCE, NIFTY 24200 CE).'),
});
export type AISignalsFromIndicatorsInput = z.infer<typeof AISignalsFromIndicatorsInputSchema>;


/**
 * Output schema for the AI signals generation flow.
 */
const AISignalsFromIndicatorsOutputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock or option that was analyzed.'),
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
 * Generates AI buy/sell signals for a given stock or option ticker.
 *
 * @param {AISignalsFromIndicatorsInput} input - The ticker to analyze.
 * @returns {Promise<AISignalsFromIndicatorsOutput>} A promise that resolves to an object containing the AI-generated signal, rationale, stop loss, and target price.
 */
export async function generateAISignalsFromIndicators(input: AISignalsFromIndicatorsInput): Promise<AISignalsFromIndicatorsOutput> {
  return aiSignalsFromIndicatorsFlow(input);
}

const aiSignalsFromIndicatorsPrompt = ai.definePrompt({
  name: 'aiSignalsFromIndicatorsPrompt',
  input: { schema: AISignalsFromIndicatorsInputSchema },
  output: { schema: AISignalsFromIndicatorsOutputSchema },
  prompt: `You are an AI-powered financial analyst. Your task is to analyze the provided Indian stock market asset and generate a trading signal.

  **Asset to Analyze**: {{{ticker}}}

  1.  **Analyze**: Briefly analyze the asset based on key technical indicators like Moving Averages, RSI, MACD, Volume, or Open Interest for options.
  2.  **Generate Signal**: Provide a clear buy, sell, or hold signal.
  3.  **Provide Rationale**: Explain your reasoning in 2-3 sentences.
  4.  **Set Levels**: Provide a specific 'stopLoss' price and a 'targetPrice'.

  Your response must be structured and only contain the requested information. Do not add any extra commentary.
  Ensure the 'ticker' field in your output exactly matches the asset you were asked to analyze.
  `,
});

const aiSignalsFromIndicatorsFlow = ai.defineFlow(
  {
    name: 'aiSignalsFromIndicatorsFlow',
    inputSchema: AISignalsFromIndicatorsInputSchema,
    outputSchema: AISignalsFromIndicatorsOutputSchema,
  },
  async (input) => {
    const {output} = await aiSignalsFromIndicatorsPrompt(input);
    return output!;
  }
);
