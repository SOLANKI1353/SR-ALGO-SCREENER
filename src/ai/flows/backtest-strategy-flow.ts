'use server';

/**
 * @fileOverview AI-powered backtesting flow for financial trading strategies.
 *
 * This file defines a Genkit flow that takes a trading strategy and a date range,
 * and returns a detailed AI-generated analysis of its performance, including
 * key metrics and a hypothetical trade log.
 *
 * @exports BacktestStrategyInput
 * @exports BacktestStrategyOutput
 * @exports backtestStrategy
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { backtestingStrategies } from '@/lib/data';

/**
 * Input schema for the backtesting flow.
 */
const BacktestStrategyInputSchema = z.object({
  strategy: z
    .string()
    .describe('The ID of the strategy to backtest (e.g., rsi_ma).'),
  dateRange: z.object({
    from: z.string().describe('The start date for the backtest (ISO 8601 format).'),
    to: z.string().describe('The end date for the backtest (ISO 8601 format).'),
  }),
  strategyDescription: z.string().optional().describe('The description of the strategy being tested.'),
});
export type BacktestStrategyInput = z.infer<typeof BacktestStrategyInputSchema>;

/**
 * Output schema for the backtesting flow.
 */
const BacktestStrategyOutputSchema = z.object({
  analysis: z.string().describe('A narrative analysis of the strategy performance, explaining its strengths and weaknesses over the period.'),
  pnl: z.number().describe('The total profit or loss from the backtest.'),
  winRate: z.number().describe('The percentage of trades that were profitable.'),
  maxDrawdown: z.number().describe('The maximum peak-to-trough decline in portfolio value, as a percentage.'),
  sharpeRatio: z.number().describe('The measure of risk-adjusted return.'),
  trades: z.array(z.object({
      ticker: z.string().describe("The stock ticker for the trade."),
      type: z.enum(['BUY', 'SELL']).describe("The type of trade executed."),
      price: z.number().describe("The execution price of the trade."),
      date: z.string().describe("The date of the trade (YYYY-MM-DD format)."),
      rationale: z.string().describe("The AI's rationale for why this specific trade was made based on the strategy."),
  })).describe("A log of hypothetical trades the AI generated for the strategy."),
});

export type BacktestStrategyOutput = z.infer<typeof BacktestStrategyOutputSchema>;

/**
 * Performs an AI-powered backtest of a given trading strategy.
 *
 * @param {BacktestStrategyInput} input - The strategy and date range to test.
 * @returns {Promise<BacktestStrategyOutput>} A promise that resolves to the detailed backtest results.
 */
export async function backtestStrategy(
  input: BacktestStrategyInput
): Promise<BacktestStrategyOutput> {
  return backtestStrategyFlow(input);
}

const backtestStrategyPrompt = ai.definePrompt({
  name: 'backtestStrategyPrompt',
  input: { schema: BacktestStrategyInputSchema },
  output: { schema: BacktestStrategyOutputSchema },
  prompt: `You are an expert quantitative financial analyst performing a backtest.

  **Strategy to test**: {{{strategy}}}
  **Strategy Description**: {{{strategyDescription}}}
  **Date Range**: From {{{dateRange.from}}} to {{{dateRange.to}}}

  **Instructions**:
  1.  **Simulate Performance**: Based on the provided strategy, simulate its performance over the given date range. Imagine how this strategy would realistically perform on a diverse set of 5-10 well-known Indian stocks (e.g., RELIANCE, TCS, HDFCBANK, INFY, ICICIBANK).
  2.  **Generate KPIs**: Calculate and provide realistic key performance indicators (KPIs). The results should be plausible but not necessarily spectacular. A Sharpe Ratio between 0.5 and 1.8 is reasonable.
  3.  **Create Trade Log**: Generate a log of 8-12 hypothetical trades that would have occurred. For each trade, provide a brief, strategy-specific rationale. For example, if the strategy is 'RSI & Moving Average Crossover', a buy rationale could be "RSI dropped below 30, indicating oversold conditions, and the price crossed above the 50-day MA, signaling a potential upward reversal."
  4.  **Write Analysis**: Write a concise, insightful analysis (2-3 sentences) summarizing the strategy's performance, its behavior in different market conditions during the period, and any notable characteristics (e.g., "The strategy performed well in trending markets but struggled during choppy, sideways periods, leading to several small losses.").

  Your response must be in the structured format defined by the output schema.
  `,
});

const backtestStrategyFlow = ai.defineFlow(
  {
    name: 'backtestStrategyFlow',
    inputSchema: BacktestStrategyInputSchema,
    outputSchema: BacktestStrategyOutputSchema,
  },
  async (input) => {
    const strategyDetails = backtestingStrategies.find(s => s.id === input.strategy);
    if (!strategyDetails) {
        throw new Error(`Strategy with ID '${input.strategy}' not found.`);
    }

    const { output } = await backtestStrategyPrompt({
      ...input,
      strategyDescription: strategyDetails.description,
    });
    return output!;
  }
);
