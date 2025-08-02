// Inside generateTopMovers() function
// Add volume and market cap
gainers.forEach(stock => {
    gainersHTML += `
        <div class="mover-stock">
            <div>
                <div class="stock-symbol">${stock.symbol}</div>
                <div class="stock-name">${stock.name}</div>
            </div>
            <div>
                <div class="stock-change positive">+${stock.change.toFixed(2)}%</div>
                <div class="stock-volume">${stock.volume}</div>
            </div>
        </div>
    `;
});

// Add sector information to mock data
{ symbol: 'ADANIENT', name: 'Adani Ent.', sector: 'Energy', price: 2850.45, change: 5.25, volume: '2.4M' }