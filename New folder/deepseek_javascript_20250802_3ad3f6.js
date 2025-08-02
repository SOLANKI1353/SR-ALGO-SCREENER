function createTradingViewChart(symbol) {
    if (tvWidget) tvWidget.remove();
    
    tvWidget = new TradingView.widget({
        symbol: symbol,
        interval: 'D',
        container_id: 'tv-chart',
        // ... other config
        studies_overrides: {
            'rsi.display': 'line',
            'rsi.linecolor': '#00bcd4'
        }
    });
}