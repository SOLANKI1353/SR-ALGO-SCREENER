// Portfolio management
const portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];

function renderPortfolio() {
    let html = '';
    portfolio.forEach(item => {
        const stock = currentStocks.find(s => s.symbol === item.symbol);
        const change = stock ? ((stock.price - item.buyPrice) / item.buyPrice * 100).toFixed(2) : 0;
        const changeClass = change >= 0 ? 'positive' : 'negative';
        
        html += `
            <div class="portfolio-item">
                <div>${item.symbol} (${item.quantity})</div>
                <div class="${changeClass}">${change}%</div>
                <div>₹${item.buyPrice}</div>
            </div>
        `;
    });
    document.getElementById('portfolioContainer').innerHTML = html;
}