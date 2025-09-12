

import { format, subDays, getDaysInMonth, startOfToday } from 'date-fns';

export const marketOverviewData = [
  {
    name: 'NIFTY 50',
    value: '24,250.50',
    change: '+150.75',
    changePercent: '+0.62%',
    changeType: 'positive' as const,
    chartData: [
      { value: 24100 }, { value: 24150 }, { value: 24120 },
      { value: 24200 }, { value: 24250 }, { value: 24230 }, { value: 24250.50 }
    ],
  },
  {
    name: 'SENSEX',
    value: '79,890.10',
    change: '+450.25',
    changePercent: '+0.57%',
    changeType: 'positive' as const,
    chartData: [
      { value: 79440 }, { value: 79500 }, { value: 79600 },
      { value: 79750 }, { value: 79800 }, { value: 79850 }, { value: 79890.10 }
    ],
  },
  {
    name: 'NIFTY BANK',
    value: '52,350.20',
    change: '-120.40',
    changePercent: '-0.23%',
    changeType: 'negative' as const,
    chartData: [
      { value: 52470 }, { value: 52400 }, { value: 52450 },
      { value: 52380 }, { value: 52300 }, { value: 52360 }, { value: 52350.20 }
    ],
  },
  {
    name: 'USD/INR',
    value: '83.55',
    change: '+0.12',
    changePercent: '+0.14%',
    changeType: 'positive' as const,
    chartData: [
        { value: 83.43 }, { value: 83.45 }, { value: 83.50 },
        { value: 83.48 }, { value: 83.52 }, { value: 83.55 }, { value: 83.55 }
    ],
  },
  {
    name: 'Gold (MCX)',
    value: '72,500',
    change: '-250',
    changePercent: '-0.34%',
    changeType: 'negative' as const,
    chartData: [
        { value: 72750 }, { value: 72600 }, { value: 72650 },
        { value: 72550 }, { value: 72500 }, { value: 72520 }, { value: 72500 }
    ],
  },
  {
    name: 'Silver (MCX)',
    value: '91,200',
    change: '+800',
    changePercent: '+0.88%',
    changeType: 'positive' as const,
    chartData: [
        { value: 90400 }, { value: 90600 }, { value: 90800 },
        { value: 90700 }, { value: 91000 }, { value: 91100 }, { value: 91200 }
    ],
  },
  {
    name: 'Crude Oil (MCX)',
    value: '6,800',
    change: '-50',
    changePercent: '-0.73%',
    changeType: 'negative' as const,
    chartData: [
        { value: 6850 }, { value: 6840 }, { value: 6820 },
        { value: 6830 }, { value: 6810 }, { value: 6805 }, { value: 6800 }
    ],
  },
  {
    name: 'NIFTY IT',
    value: '35,600.80',
    change: '-250.60',
    changePercent: '-0.70%',
    changeType: 'negative' as const,
    chartData: [
      { value: 35850 }, { value: 35800 }, { value: 35750 },
      { value: 35700 }, { value: 35650 }, { value: 35620 }, { value: 35600.80 }
    ],
  },
];

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
  mostActive: [
    { ticker: "HDFCBANK", price: 1520.60, change: "+0.8%", volume: "10.2M" },
    { ticker: "RELIANCE", price: 2950.80, change: "+1.2%", volume: "8.1M" },
    { ticker: "WIPRO", price: 475.60, change: "-1.5%", volume: "7.3M" },
    { ticker: "CIPLA", price: 1495.30, change: "-3.2%", volume: "6.2M" },
    { ticker: "INFY", price: 1650.45, change: "-0.5%", volume: "6.5M" },
  ],
  fiftyTwoWeekHigh: [
    { ticker: "ADANIPORTS", price: 1455.00, change: "+6.0%", high: 1460.00, low: 760.00 },
    { ticker: "BPCL", price: 637.00, change: "+4.5%", high: 640.00, low: 320.00 },
    { ticker: "TATASTEEL", price: 178.00, change: "+4.8%", high: 180.00, low: 105.00 },
    { ticker: "HEROMOTOCO", price: 5610.00, change: "+3.1%", high: 5625.00, low: 2800.00 },
  ],
  fiftyTwoWeekLow: [
    { ticker: "UPL", price: 545.00, change: "-1.2%", high: 800.00, low: 542.00 },
    { ticker: "ZEEL", price: 148.50, change: "-2.5%", high: 280.00, low: 148.00 },
    { ticker: "ASIANPAINT", price: 2850.00, change: "-0.5%", high: 3500.00, low: 2845.00 },
  ],
  volumeBuzzers: [
    { ticker: "IDEA", price: 17.50, change: "+8.2%", volume: "150.3M" },
    { ticker: "YESBANK", price: 24.10, change: "+3.5%", volume: "95.1M" },
    { ticker: "PNB", price: 125.00, change: "+2.5%", volume: "50.8M" },
    { ticker: "SAIL", price: 155.20, change: "+4.1%", volume: "45.2M" },
  ],
};

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

export const sectoralFlowData = {
    topBuying: [
        { 
            name: "PSU Bank", 
            value: 85,
            stocks: [
                { ticker: "SBIN", price: 830.4, change: "+1.5%" },
                { ticker: "BANKBARODA", price: 280.0, change: "+3.1%" },
                { ticker: "PNB", price: 125.0, change: "+2.5%" },
                { ticker: "CANBK", price: 118.0, change: "+2.9%" },
            ]
        },
        { 
            name: "Metals", 
            value: 78,
            stocks: [
                { ticker: "TATASTEEL", price: 175.0, change: "+3.5%" },
                { ticker: "JSWSTEEL", price: 930.0, change: "+2.8%" },
                { ticker: "HINDALCO", price: 680.0, change: "+4.1%" },
            ]
        },
        { 
            name: "Oil & Gas", 
            value: 65,
            stocks: [
                { ticker: "RELIANCE", price: 2950.8, change: "+1.2%" },
                { ticker: "BPCL", price: 635.2, change: "+4.2%" },
                { ticker: "ONGC", price: 270.0, change: "+1.8%" },
            ]
        },
    ],
    topSelling: [
        { 
            name: "Pharma", 
            value: 92,
            stocks: [
                { ticker: "SUNPHARMA", price: 1600.0, change: "-1.8%" },
                { ticker: "CIPLA", price: 1495.3, change: "-3.2%" },
                { ticker: "DRREDDY", price: 6200.1, change: "-2.8%" },
            ]
        },
        { 
            name: "FMCG", 
            value: 75,
            stocks: [
                { ticker: "HINDUNILVR", price: 2450.0, change: "-0.9%" },
                { ticker: "NESTLEIND", price: 2500.5, change: "-2.5%" },
                { ticker: "ITC", price: 430.1, change: "-0.2%" },
            ]
        },
        { 
            name: "IT", 
            value: 60,
            stocks: [
                { ticker: "INFY", price: 1650.45, change: "-0.5%" },
                { ticker: "HCLTECH", price: 1440.0, change: "-1.1%" },
                { ticker: "WIPRO", price: 475.6, change: "-1.5%" },
            ]
        },
    ]
};


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

export const openingRangeBreakoutData = {
    bullish: [
        { ticker: "INDUSINDBK", breakoutPrice: 1505.50, volume: "1.8M", time: "09:25 AM", breakoutType: 'bullish' as const },
        { ticker: "ULTRACEMCO", breakoutPrice: 10850.00, volume: "0.5M", time: "09:31 AM", breakoutType: 'bullish' as const },
        { ticker: "LT", breakoutPrice: 3620.10, volume: "2.1M", time: "09:40 AM", breakoutType: 'bullish' as const },
    ],
    bearish: [
        { ticker: "UPL", breakoutPrice: 550.75, volume: "3.2M", time: "09:28 AM", breakoutType: 'bearish' as const },
        { ticker: "ASIANPAINT", breakoutPrice: 2865.00, volume: "1.2M", time: "09:35 AM", breakoutType: 'bearish' as const },
    ]
}


function generateOptionsData(atmPrice: number) {
  const strikePrices = Array.from({ length: 15 }, (_, i) => atmPrice - (7 * 50) + (i * 50));
  
  const generateSide = (isCall: boolean) => {
    return strikePrices.map(strike => {
      const isITM = isCall ? strike < atmPrice : strike > atmPrice;
      const isATM = Math.abs(strike - atmPrice) < 50;
      return {
        strike: strike,
        oi: `${(Math.random() * 50 + (isATM ? 30 : 10)).toFixed(1)}k`,
        volume: `${(Math.random() * 20 + (isATM ? 15 : 5)).toFixed(1)}k`,
        iv: `${(Math.random() * 15 + 10).toFixed(1)}%`,
        ltp: Math.max(0.05, (isCall ? Math.max(0, atmPrice - strike) : Math.max(0, strike - atmPrice)) + (Math.random() * 30 + 5) * (isITM ? 1 : 0.5)).toFixed(2),
      };
    });
  };

  return {
    calls: generateSide(true),
    puts: generateSide(false),
  };
}

export const optionChainData = {
  "NIFTY": {
    underlyingPrice: 24250.50,
    options: generateOptionsData(24250)
  },
  "BANKNIFTY": {
    underlyingPrice: 52350.20,
    options: generateOptionsData(52350)
  },
  "RELIANCE": {
    underlyingPrice: 2980.00,
    options: generateOptionsData(2980)
  }
}

export const advanceDeclineData = [
  { name: 'NIFTY 50', advances: 35, declines: 15 },
  { name: 'NIFTY BANK', advances: 8, declines: 4 },
  { name: 'NIFTY IT', advances: 3, declines: 7 },
  { name: 'NIFTY FMCG', advances: 5, declines: 10 },
  { name: 'NIFTY AUTO', advances: 12, declines: 3 },
  { name: 'NIFTY PHARMA', advances: 6, declines: 4 },
  { name: 'NIFTY METAL', advances: 9, declines: 1 },
  { name: 'NIFTY REALTY', advances: 2, declines: 8 },
];


const generateDailyFlows = (date: Date, days: number) => {
    const dataPoints = days || 1;
    const startDate = days ? startOfToday() : date;

    const generatedData = Array.from({length: dataPoints}).map((_, i) => {
        const currentDate = subDays(startDate, i);
        return {
            date: format(currentDate, 'dd MMM yyyy'),
            fii: parseFloat(((Math.random() - 0.45) * 8000).toFixed(2)),
            dii: parseFloat(((Math.random() - 0.55) * 6000).toFixed(2))
        };
    }).filter(d => { // Filter out weekends
        const dayOfWeek = new Date(d.date).getDay();
        return dayOfWeek !== 0 && dayOfWeek !== 6;
    });

    return days ? generatedData.slice(0, days) : generatedData;
};

export const fiiDiiData = (date: Date = new Date(), days: number) => {
    return {
        cash: generateDailyFlows(date, days).map(d => ({...d, dii: parseFloat(((Math.random() - 0.48) * 6000).toFixed(2))})),
        indexFutures: generateDailyFlows(date, days),
        stockFutures: generateDailyFlows(date, days)
    };
};

export type SearchableInstrument = {
  ticker: string;
  name?: string;
  price: number;
  change: string;
  volume: string;
  exchange: 'NSE' | 'BSE' | 'INDEX';
};

const nseStocks: SearchableInstrument[] = [
    { ticker: "RELIANCE", name: "Reliance Industries", price: 2950.80, change: "+1.2%", volume: "8.1M", exchange: "NSE" },
    { ticker: "TCS", name: "Tata Consultancy Services", price: 3950.75, change: "+2.1%", volume: "4.5M", exchange: "NSE" },
    { ticker: "HDFCBANK", name: "HDFC Bank", price: 1520.60, change: "+0.8%", volume: "10.2M", exchange: "NSE" },
    { ticker: "INFY", name: "Infosys", price: 1650.45, change: "-0.5%", volume: "6.5M", exchange: "NSE" },
    { ticker: "ICICIBANK", name: "ICICI Bank", price: 1150.25, change: "+2.1%", volume: "9.2M", exchange: "NSE" },
    { ticker: "SBIN", name: "State Bank of India", price: 830.4, change: "+1.5%", volume: "12.3M", exchange: "NSE" },
    { ticker: "BHARTIARTL", name: "Bharti Airtel", price: 1400.0, change: "+0.9%", volume: "5.5M", exchange: "NSE" },
    { ticker: "ITC", name: "ITC Ltd.", price: 430.1, change: "-0.2%", volume: "11.2M", exchange: "NSE" },
    { ticker: "LICI", name: "Life Insurance Corp", price: 990.0, change: "+1.8%", volume: "7.1M", exchange: "NSE" },
    { ticker: "ZOMATO", name: "Zomato Ltd", price: 185.5, change: "+3.3%", volume: "25.6M", exchange: "NSE" },
    { ticker: "SHAKTIPUMP", name: "Shakti Pumps (India) Ltd.", price: 2850.0, change: "+4.5%", volume: "1.5M", exchange: "NSE" },
];

const bseStocks: SearchableInstrument[] = [
    { ticker: "BOMDYEING", name: "Bombay Dyeing", price: 180.20, change: "+3.2%", volume: "1.1M", exchange: "BSE" },
    { ticker: "SPICEJET", name: "Spicejet Ltd", price: 65.50, change: "-1.8%", volume: "5.4M", exchange: "BSE" },
    { ticker: "MRPL", name: "Mangalore Refinery", price: 220.90, change: "+5.0%", volume: "3.2M", exchange: "BSE" },
    { ticker: "IRCON", name: "Ircon International", price: 265.0, change: "+1.1%", volume: "4.8M", exchange: "BSE" },
    { ticker: "HUDCO", name: "Housing & Urban Development", price: 270.0, change: "+2.4%", volume: "6.2M", exchange: "BSE" },
];

const allIndices: SearchableInstrument[] = [
    { ticker: "NIFTY 50", name: "NIFTY 50", price: 24250.50, change: "+0.62%", volume: "N/A", exchange: "INDEX" },
    { ticker: "SENSEX", name: "BSE SENSEX", price: 79890.10, change: "+0.57%", volume: "N/A", exchange: "INDEX" },
    { ticker: "NIFTY BANK", name: "NIFTY Bank", price: 52350.20, change: "-0.23%", volume: "N/A", exchange: "INDEX" },
    { ticker: "NIFTY IT", name: "NIFTY IT", price: 35600.80, change: "-0.70%", volume: "N/A", exchange: "INDEX" },
    { ticker: "NIFTY MIDCAP 100", name: "NIFTY Midcap 100", price: 55100.00, change: "+0.55%", volume: "N/A", exchange: "INDEX" },
    { ticker: "NIFTY SMALLCAP 100", name: "NIFTY Smallcap 100", price: 18100.00, change: "+0.75%", volume: "N/A", exchange: "INDEX" },
];

export const searchableInstruments: SearchableInstrument[] = [
  ...nseStocks,
  ...bseStocks,
  ...allIndices
];

type WatchlistItem = {
  ticker: string;
  price: number;
  change: string;
  volume: string;
  exchange: 'NSE' | 'BSE' | 'INDEX';
};

export const initialWatchlists: { [key: string]: WatchlistItem[] } = {
    "My Watchlist": [
        { ticker: "RELIANCE", price: 2950.80, change: "+1.2%", volume: "8.1M", exchange: "NSE" },
        { ticker: "INFY", price: 1650.45, change: "-0.5%", volume: "6.5M", exchange: "NSE" },
        { ticker: "HDFCBANK", price: 1520.60, change: "+0.8%", volume: "10.2M", exchange: "NSE" },
    ],
    "NIFTY 50": [
        { ticker: "RELIANCE", price: 2950.80, change: "+1.2%", volume: "8.1M", exchange: "NSE" },
        { ticker: "HDFCBANK", price: 1520.60, change: "+0.8%", volume: "10.2M", exchange: "NSE" },
        { ticker: "TCS", price: 3950.75, change: "+2.1%", volume: "4.5M", exchange: "NSE" },
    ]
};

    
