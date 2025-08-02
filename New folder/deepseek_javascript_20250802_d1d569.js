// Throttle real-time updates
let lastUpdate = 0;
function throttledUpdate() {
    const now = Date.now();
    if (now - lastUpdate > 1000) { // Update max once per second
        generateStockData();
        lastUpdate = now;
    }
}

// Replace setInterval with:
setInterval(throttledUpdate, 100);