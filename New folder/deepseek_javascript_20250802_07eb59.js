function scanForPatterns() {
    const results = [];
    
    currentStocks.forEach(stock => {
        // RSI Oversold
        if (stock.rsi < 30) {
            results.push({
                symbol: stock.symbol,
                pattern: 'RSI Oversold',
                confidence: 70
            });
        }
        
        // Golden Cross (50MA > 200MA)
        if (stock.ma50 > stock.ma200) {
            results.push({
                symbol: stock.symbol,
                pattern: 'Golden Cross',
                confidence: 85
            });
        }
    });
    
    return results;
}