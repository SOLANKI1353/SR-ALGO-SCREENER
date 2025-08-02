// Cache stock data
function getStockData() {
    const cached = localStorage.getItem('stockData');
    if (cached) return JSON.parse(cached);
    
    // Fetch fresh data
    const data = generateStockData();
    localStorage.setItem('stockData', JSON.stringify(data));
    return data;
}