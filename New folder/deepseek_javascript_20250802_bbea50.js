let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (tvWidget) tvWidget.chart().resize();
    }, 300);
});