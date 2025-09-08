'use server';

/**
 * @fileOverview AI-driven buy/sell signal generation based on financial indicators.
 *
 * This file defines a Genkit flow that takes financial indicators as input
 * and returns AI-generated buy/sell signals. It uses an LLM to interpret
 * the indicators and provide actionable insights for potential investments.
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
  ticker: z.string().describe('The ticker symbol of the stock to analyze.'),
  movingAverage: z
    .number()
    .describe('The moving average value for the stock.'),
  relativeStrengthIndex: z
    .number()
    .describe('The relative strength index (RSI) for the stock.'),
  macd: z.number().describe('The moving average convergence divergence (MACD) for the stock.'),
  volume: z.number().describe('The trading volume for the stock.'),
});

/**
 * @typedef {object} AISignalsFromIndicatorsInput
 * @property {string} ticker - The ticker symbol of the stock.
 * @property {number} movingAverage - The moving average value.
 * @property {number} relativeStrengthIndex - The relative strength index (RSI).
 * @property {number} macd - The moving average convergence divergence (MACD).
 * @property {number} volume - The trading volume.
 */
export type AISignalsFromIndicatorsInput = z.infer<
  typeof AISignalsFromIndicatorsInputSchema
>;

/**
 * Output schema for the AI signals generation flow.
 */
const AISignalsFromIndicatorsOutputSchema = z.object({
  signal: z
    .string()
    .describe(
      'The AI-generated buy/sell signal (e.g., Buy, Sell, Hold) based on the indicators.'
    ),
  rationale: z
    .string()
    .describe('The rationale behind the generated signal, explaining why the AI recommends it.'),
});

/**
 * @typedef {object} AISignalsFromIndicatorsOutput
 * @property {string} signal - The AI-generated buy/sell signal.
 * @property {string} rationale - The rationale behind the signal.
 */
export type AISignalsFromIndicatorsOutput = z.infer<
  typeof AISignalsFromIndicatorsOutputSchema
>;

/**
 * Generates AI buy/sell signals based on provided financial indicators.
 *
 * @param   {AISignalsFromIndicatorsInput} input - The input data containing financial indicators.
 *
 * @returns {Promise<AISignalsFromIndicatorsOutput>}         A promise that resolves to an object containing the AI-generated signal and its rationale.
 */
export async function generateAISignalsFromIndicators(
  input: AISignalsFromIndicatorsInput
): Promise<AISignalsFromIndicatorsOutput> {
  return aiSignalsFromIndicatorsFlow(input);
}

const aiSignalsFromIndicatorsPrompt = ai.definePrompt({
  name: 'aiSignalsFromIndicatorsPrompt',
  input: {schema: AISignalsFromIndicatorsInputSchema},
  output: {schema: AISignalsFromIndicatorsOutputSchema},
  prompt: `You are an AI-powered financial analyst. Based on the given financial indicators for the stock {{{ticker}}}, generate a buy/sell signal and provide a rationale for your recommendation.

  Here are the indicators:
  - Moving Average: {{{movingAverage}}}
  - Relative Strength Index (RSI): {{{relativeStrengthIndex}}}
  - MACD: {{{macd}}}
  - Volume: {{{volume}}}

  Consider these indicators and provide a concise buy/sell signal (Buy, Sell, or Hold) along with a clear rationale.
  Signal: 
  Rationale: `,
});

const aiSignalsFromIndicatorsFlow = ai.defineFlow(
  {
    name: 'aiSignalsFromIndicatorsFlow',
    inputSchema: AISignalsFromIndicatorsInputSchema,
    outputSchema: AISignalsFromIndicatorsOutputSchema,
  },
  async input => {
    const {output} = await aiSignalsFromIndicatorsPrompt(input);
    return output!;
  }
);
