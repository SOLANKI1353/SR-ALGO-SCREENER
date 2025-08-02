// Fetch market news (simulated)
function loadMarketNews() {
    const news = [
        { title: 'RBI Maintains Interest Rates', source: 'Economic Times', time: '2h ago' },
        { title: 'Infosys Announces New AI Platform', source: 'Business Standard', time: '4h ago' }
    ];
    
    let html = '';
    news.forEach(item => {
        html += `
            <div class="news-item">
                <h4>${item.title}</h4>
                <div class="news-meta">${item.source} • ${item.time}</div>
            </div>
        `;
    });
    
    document.getElementById('newsContainer').innerHTML = html;
}