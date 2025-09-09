
import { format, subDays } from 'date-fns';

export const topMovers = {
  gainers: [
    { ticker: "ADANIPORTS", price: 1450.55, change: "+5.8%", volume: "2.3M" },
    { ticker: "BPCL", price: 635.20, change: "+4.2%", volume: "5.1M" },
    { ticker: "HDFCLIFE", price: 580.90, change: "+3.5%", volume: "3.8M" },
    { ticker: "HEROMOTOCO", price: 5600.00, change: "+2.9%", volume: "1.2M" },
    { ticker: "TCS", price: 3950.75, change: "+2.1%", volume: "4.5M" },
  ],
  losers: [
    { ticker: "CIPLA", price: 1495.30, change: "-3.2%", volume: "6.2M" },
    { ticker: "DRREDDY", price: 6200.10, change: "-2.8%", volume: "2.1M" },
    { ticker: "NESTLEIND", price: 2500.50, change: "-2.5%", volume: "1.9M" },
    { ticker: "TECHM", price: 1380.00, change: "-1.9%", volume: "4.8M" },
    { ticker: "WIPRO", price: 475.60, change: "-1.5%", volume: "7.3M" },
  ],
};

export const initialWatchlist = [
  { ticker: "RELIANCE", price: 2950.80, change: "+1.2%", volume: "8.1M" },
  { ticker: "INFY", price: 1650.45, change: "-0.5%", volume: "6.5M" },
  { ticker: "HDFCBANK", price: 1520.60, change: "+0.8%", volume: "10.2M" },
];

export const heatmapData = [
  {
    name: "Financial Services",
    value: 2.1,
    marketCap: "40T",
    stocks: [
      { ticker: "HDFCBANK", price: 1520.6, change: "+0.8%" },
      { ticker: "ICICIBANK", price: 1150.25, change: "+2.1%" },
      { ticker: "SBIN", price: 830.4, change: "+1.5%" },
      { ticker: "AXISBANK", price: 1230.9, change: "+2.8%" },
      { ticker: "KOTAKBANK", price: 1750.0, change: "+0.2%" },
    ],
  },
  {
    name: "IT",
    value: -0.8,
    marketCap: "30T",
    stocks: [
      { ticker: "TCS", price: 3950.75, change: "+2.1%" },
      { ticker: "INFY", price: 1650.45, change: "-0.5%" },
      { ticker: "HCLTECH", price: 1440.0, change: "-1.1%" },
      { ticker: "WIPRO", price: 475.6, change: "-1.5%" },
      { ticker: "TECHM", price: 1380.0, change: "-1.9%" },
    ],
  },
  {
    name: "Oil & Gas",
    value: 1.5,
    marketCap: "25T",
    stocks: [
      { ticker: "RELIANCE", price: 2950.8, change: "+1.2%" },
      { ticker: "BPCL", price: 635.2, change: "+4.2%" },
      { ticker: "ONGC", price: 270.0, change: "+1.8%" },
      { ticker: "GAIL", price: 215.5, change: "+0.7%" },
    ],
  },
  {
    name: "FMCG",
    value: -1.2,
    marketCap: "20T",
    stocks: [
      { ticker: "HINDUNILVR", price: 2450.0, change: "-0.9%" },
      { ticker: "ITC", price: 430.1, change: "-0.2%" },
      { ticker: "NESTLEIND", price: 2500.5, change: "-2.5%" },
      { ticker: "BRITANNIA", price: 5300.0, change: "+0.1%" },
    ],
  },
  {
    name: "Pharma",
    value: -2.5,
    marketCap: "18T",
    stocks: [
      { ticker: "SUNPHARMA", price: 1600.0, change: "-1.8%" },
      { ticker: "CIPLA", price: 1495.3, change: "-3.2%" },
      { ticker: "DRREDDY", price: 6200.1, change: "-2.8%" },
      { ticker: "APOLLOHOSP", price: 6100.0, change: "-0.5%" },
    ],
  },
  {
    name: "Automobile",
    value: 0.9,
    marketCap: "15T",
    stocks: [
      { ticker: "MARUTI", price: 12800.0, change: "+1.1%" },
      { ticker: "M&M", price: 2900.0, change: "+0.8%" },
      { ticker: "TATAMOTORS", price: 970.0, change: "+0.5%" },
      { ticker: "HEROMOTOCO", price: 5600.0, change: "+2.9%" },
    ],
  },
  {
    name: "Metals",
    value: 3.2,
    marketCap: "12T",
    stocks: [
        { ticker: "TATASTEEL", price: 175.0, change: "+3.5%" },
        { ticker: "JSWSTEEL", price: 930.0, change: "+2.8%" },
        { ticker: "HINDALCO", price: 680.0, change: "+4.1%" },
        { ticker: "VEDL", price: 460.0, change: "+2.2%" },
    ]
  },
  {
    name: "Consumer Durables",
    value: 0.5,
    marketCap: "10T",
    stocks: [
        { ticker: "TITAN", price: 3500.0, change: "+1.0%" },
        { ticker: "HAVELLS", price: 1900.0, change: "+0.5%" },
        { ticker: "VOLTAS", price: 1500.0, change: "-0.2%" },
        { ticker: "DIXON", price: 10000.0, change: "+1.5%" },
    ]
  },
  {
    name: "Realty",
    value: -0.5,
    marketCap: "8T",
    stocks: [
        { ticker: "DLF", price: 850.0, change: "-1.0%" },
        { ticker: "GODREJPROP", price: 3000.0, change: "+0.3%" },
        { ticker: "OBEROIRLTY", price: 1400.0, change: "-1.5%" },
        { ticker: "PRESTIGE", price: 1900.0, change: "-0.8%" },
    ]
  },
   {
    name: "PSU Bank",
    value: 2.8,
    marketCap: "14T",
    stocks: [
        { ticker: "SBIN", price: 830.4, change: "+1.5%" },
        { ticker: "BANKBARODA", price: 280.0, change: "+3.1%" },
        { ticker: "PNB", price: 125.0, change: "+2.5%" },
        { ticker: "CANBK", price: 118.0, change: "+2.9%" },
    ]
  },
  {
    name: "Media",
    value: -1.8,
    marketCap: "5T",
    stocks: [
        { ticker: "ZEEL", price: 150.0, change: "-2.0%" },
        { ticker: "SUNTV", price: 750.0, change: "-1.2%" },
        { ticker: "PVRINOX", price: 1400.0, change: "-1.5%" },
        { ticker: "NETWORK18", price: 90.0, change: "-2.5%" },
    ]
  },
  {
    name: "Power",
    value: 1.9,
    marketCap: "16T",
    stocks: [
        { ticker: "NTPC", price: 360.0, change: "+2.2%" },
        { ticker: "POWERGRID", price: 330.0, change: "+1.8%" },
        { ticker: "ADANIPOWER", price: 750.0, change: "+3.0%" },
        { ticker: "TATAPOWER", price: 440.0, change: "+1.5%" },
    ]
  }
];

export const backtestingStrategies = [
    { id: 'rsi_ma', name: 'RSI & Moving Average Crossover', description: 'Buys when RSI is oversold and price crosses above 50-day MA.' },
    { id: 'macd_cross', name: 'MACD Crossover', description: 'Generates signals based on MACD line and signal line crossovers.' },
    { id: 'volume_spike', name: 'Volume Spike', description: 'Identifies unusual trading volume to signal potential moves.' },
];

const today = new Date();
export const backtestingResults = {
    pnl: 15230.45,
    winRate: 68.5,
    maxDrawdown: -12.3,
    sharpeRatio: 1.85,
    trades: [
        { ticker: 'RELIANCE', type: 'BUY' as const, price: 2800, date: format(subDays(today, 25), 'yyyy-MM-dd') },
        { ticker: 'RELIANCE', type: 'SELL' as const, price: 2950, date: format(subDays(today, 15), 'yyyy-MM-dd') },
        { ticker: 'TCS', type: 'BUY' as const, price: 3800, date: format(subDays(today, 10), 'yyyy-MM-dd') },
        { ticker: 'TCS', type: 'SELL' as const, price: 3950, date: format(subDays(today, 2), 'yyyy-MM-dd') },
    ]
}
