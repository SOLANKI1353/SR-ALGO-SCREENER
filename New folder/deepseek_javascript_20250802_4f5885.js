function generateStockData() {
    // Simulate price changes using random walk
    stocks.forEach(stock => {
        const volatility = 0.8; // Stock volatility factor
        const change = (Math.random() - 0.5) * volatility;
        const newPrice = stock.price * (1 + change/100);
        
        // Update RSI based on momentum
        const rsiChange = change > 0 ? 
              Math.min(1, change * 0.5) : 
              Math.max(-1, change * 0.5);
        
        // Update volume randomly
        const volumeChange = Math.random() * 20 - 10;
    });
}