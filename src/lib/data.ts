// data.ts

// Market Overview Data
export const marketOverviewData = [
  {
    title: 'NIFTY 50',
    value: '24,680.85',
    change: '+189.00 (0.77%)',
    changeType: 'positive' as const, // correct usage
  },
  {
    title: 'SENSEX',
    value: '81,465.49',
    change: '+599.34 (0.74%)',
    changeType: 'positive' as const,
  },
  {
    title: 'NIFTY BANK',
    value: '52,705.15',
    change: '+517.05 (0.99%)',
    changeType: 'positive' as const,
  },
  {
    title: 'FINNIFTY',
    value: '23,239.10',
    change: '+243.10 (1.06%)',
    changeType: 'positive' as const,
  },
  {
    title: 'NIFTY MIDCAP 100',
    value: '56,599.65',
    change: '+414.20 (0.74%)',
    changeType: 'positive' as const,
  },
  {
    title: 'NIFTY SMALLCAP 100',
    value: '18,199.45',
    change: '+172.15 (0.95%)',
    changeType: 'positive' as const,
  },
];

// Top Movers Data
export const topMovers = [
  { name: 'HDFCBANK', price: '1,643.60', change: '1.82%', changeType: 'positive' as const },
  { name: 'ICICIBANK', price: '1,229.40', change: '1.68%', changeType: 'positive' as const },
  { name: 'INFY', price: '1,882.35', change: '1.53%', changeType: 'positive' as const },
  { name: 'RELIANCE', price: '3,191.10', change: '1.39%', changeType: 'positive' as const },
  { name: 'AXISBANK', price: '1,282.65', change: '1.34%', changeType: 'positive' as const },
];

// Heatmap Data
export const heatmapData = [
  { sector: 'IT', change: 1.5 },
  { sector: 'BANKS', change: 2.1 },
  { sector: 'PHARMA', change: -0.8 },
  { sector: 'FMCG', change: 0.6 },
  { sector: 'AUTO', change: -1.2 },
];

// All Indices Data
export const allIndices = [
  { name: 'NIFTY 50', price: '24,680.85', change: '+189.00 (0.77%)', changeType: 'positive' as const },
  { name: 'SENSEX', price: '81,465.49', change: '+599.34 (0.74%)', changeType: 'positive' as const },
  { name: 'NIFTY BANK', price: '52,705.15', change: '+517.05 (0.99%)', changeType: 'positive' as const },
  { name: 'FINNIFTY', price: '23,239.10', change: '+243.10 (1.06%)', changeType: 'positive' as const },
  { name: 'NIFTY MIDCAP 100', price: '56,599.65', change: '+414.20 (0.74%)', changeType: 'positive' as const },
  { name: 'NIFTY SMALLCAP 100', price: '18,199.45', change: '+172.15 (0.95%)', changeType: 'positive' as const },
];
