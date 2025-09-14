'use server';

/**
 * @fileOverview AI-powered backtesting flow for financial trading strategies (Refined Version).
 *
 * Added:
 *  - Schema refinements (realistic ranges for KPIs)
 *  - Benchmark comparison field
 *  - Equity curve output for charting
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
});
export type BacktestStrategyInput = z.infer<typeof BacktestStrategyInputSchema>;

/**
 * Output schema for the backtesting flow (refined).
 */
const BacktestStrategyOutputSchema = z.object({
  analysis: z.string().describe('Narrative analysis of the strategy performance.'),
  pnl: z.number().describe('The total profit or loss from the backtest.'),
  winRate: z.number().min(0).max(100).describe('The percentage of trades that were profitable (0–100%).'),
  maxDrawdown: z.number().min(0).max(100).describe('Maximum peak-to-trough decline in % (0–100).'),
  sharpeRatio: z.number().min(-2).max(3).describe('Risk-adjusted return (-2 to 3).'),
  benchmarkComparison: z.string().describe('Comparison of strategy performance vs benchmark (e.g., NIFTY50).'),
  equityCurve: z.array(z.object({
    date: z.string().describe('The date (YYYY-MM-DD).'),
    portfolioValue: z.number().describe('Portfolio value at this date.'),
  })).describe('Daily/periodic portfolio values for charting equity curve.'),
  trades: z.array(z.object({
    ticker: z.string().describe("The stock ticker for the trade."),
    type: z.enum(['BUY', 'SELL']).describe("The type of trade executed."),
    price: z.number().describe("The execution price of the trade."),
    date: z.string().describe("The date of the trade (YYYY-MM-DD format)."),
    rationale: z.string().describe("AI rationale for the trade decision."),
  })).describe("Hypothetical trade log."),
});
export type BacktestStrategyOutput = z.infer<typeof BacktestStrategyOutputSchema>;

/**
 * Performs an AI-powered backtest of a given trading strategy.
 */
export async function backtestStrategy(
  input: BacktestStrategyInput
): Promise<BacktestStrategyOutput> {
  // Validate input before processing
  BacktestStrategyInputSchema.parse(input);

  return backtestStrategyFlow(input);
}

const BacktestStrategyPromptInputSchema = BacktestStrategyInputSchema.extend({
  strategyDescription: z.string().describe('The description of the strategy being tested.'),
});

const backtestStrategyPrompt = ai.definePrompt({
  name: 'backtestStrategyPrompt',
  input: { schema: BacktestStrategyPromptInputSchema },
  output: { schema: BacktestStrategyOutputSchema },
  prompt: `You are an expert quantitative financial analyst performing a backtest.

  **Strategy to test**: {{{strategy}}}
  **Strategy Description**: {{{strategyDescription}}}
  **Date Range**: From {{{dateRange.from}}} to {{{dateRange.to}}}

  **Instructions**:
  1. Simulate performance realistically on 5–10 well-known Indian stocks (RELIANCE, TCS, HDFCBANK, INFY, ICICIBANK, etc.).
  2. Generate realistic KPIs:
     - Sharpe Ratio between -2 and 3
     - Win Rate between 0% and 100%
     - Max Drawdown between 0% and 100%
  3. Create a trade log of 8–12 trades with rationale based on the strategy.
  4. Provide a short equity curve (10–20 points) showing portfolio value over time.
  5. Compare performance vs benchmark (e.g., NIFTY50).
  6. Write a concise analysis (2–3 sentences) summarizing performance.

  Your response must follow the output schema strictly.
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

    try {
      const { output } = await backtestStrategyPrompt({
        ...input,
        strategyDescription: strategyDetails.description,
      });
      return output!;
    } catch (err) {
      throw new Error(`AI backtest failed: ${(err as Error).message}`);
    }
  }
);
