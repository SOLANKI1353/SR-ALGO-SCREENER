
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
      { ticker: "HDFCBANK", price: 1520.60, change: "+0.8%" },
      { ticker: "ICICIBANK", price: 1150.25, change: "+2.1%" },
      { ticker: "SBIN", price: 830.40, change: "+1.5%" },
      { ticker: "AXISBANK", price: 1230.90, change: "+2.8%" },
      { ticker: "KOTAKBANK", price: 1750.00, change: "+0.2%" },
    ]
  },
  { 
    name: "IT", 
    value: -0.8, 
    marketCap: "30T",
    stocks: [
      { ticker: "TCS", price: 3950.75, change: "+2.1%" },
      { ticker: "INFY", price: 1650.45, change: "-0.5%" },
      { ticker: "HCLTECH", price: 1440.00, change: "-1.1%" },
      { ticker: "WIPRO", price: 475.60, change: "-1.5%" },
      { ticker: "TECHM", price: 1380.00, change: "-1.9%" },
    ]
  },
  { 
    name: "Oil & Gas", 
    value: 1.5, 
    marketCap: "25T",
    stocks: [
        { ticker: "RELIANCE", price: 2950.80, change: "+1.2%" },
        { ticker: "BPCL", price: 635.20, change: "+4.2%" },
        { ticker: "ONGC", price: 270.00, change: "+1.8%" },
        { ticker: "GAIL", price: 215.50, change: "+0.7%" },
    ]
  },
  { 
    name: "FMCG", 
    value: -1.2, 
    marketCap: "20T",
    stocks: [
        { ticker: "HINDUNILVR", price: 2450.00, change: "-0.9%" },
        { ticker: "ITC", price: 430.10, change: "-0.2%" },
        { ticker: "NESTLEIND", price: 2500.50, change: "-2.5%" },
        { ticker: "BRITANNIA", price: 5300.00, change: "+0.1%" },
    ]
  },
  { 
    name: "Healthcare", 
    value: -2.5, 
    marketCap: "18T",
    stocks: [
        { ticker: "SUNPHARMA", price: 1600.00, change: "-1.8%" },
        { ticker: "CIPLA", price: 1495.30, change: "-3.2%" },
        { ticker: "DRREDDY", price: 6200.10, change: "-2.8%" },
        { ticker: "APOLLOHOSP", price: 6100.00, change: "-0.5%" },
    ]
  },
  { 
    name: "Automobile", 
    value: 0.9, 
    marketCap: "15T",
    stocks: [
        { ticker: "MARUTI", price: 12800.00, change: "+1.1%" },
        { ticker: "M&M", price: 2900.00, change: "+0.8%" },
        { ticker: "TATAMOTORS", price: 970.00, change: "+0.5%" },
        { ticker: "HEROMOTOCO", price: 5600.00, change: "+2.9%" },
    ]
  },
];

export const backtestingStrategies = [
    { id: 'rsi_ma', name: 'RSI & Moving Average Crossover', description: 'Buys when RSI is oversold and price crosses above 50-day MA.' },
    { id: 'macd_cross', name: 'MACD Crossover', description: 'Generates signals based on MACD line and signal line crossovers.' },
    { id: 'volume_spike', name: 'Volume Spike', description: 'Identifies unusual trading volume to signal potential moves.' },
];

export const backtestingResults = {
    pnl: 15230.45,
    winRate: 68.5,
    maxDrawdown: -12.3,
    sharpeRatio: 1.85,
    trades: [
        { ticker: 'RELIANCE', type: 'BUY' as const, price: 2800, date: '2023-10-01' },
        { ticker: 'RELIANCE', type: 'SELL' as const, price: 2950, date: '2023-10-15' },
        { ticker: 'TCS', type: 'BUY' as const, price: 3800, date: '2023-11-05' },
        { ticker: 'TCS', type: 'SELL' as const, price: 3950, date: '2023-11-20' },
    ]
}
