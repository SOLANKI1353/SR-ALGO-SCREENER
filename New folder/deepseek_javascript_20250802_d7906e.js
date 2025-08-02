// Inside generateSectorHeatMap()
// Add intensity based on percentage change
const intensity = Math.min(100, Math.abs(sector.change) * 20); // 0-100 scale
heatMapHTML += `
    <div class="heatmap-item ${sector.status}" 
         style="--intensity: ${intensity}%"
         data-tooltip="${sector.name}: ${changeSign}${sector.change.toFixed(2)}%">
        ...
    </div>
`;

// Add to CSS:
.heatmap-item.positive {
    background: linear-gradient(
        to bottom, 
        rgba(16, 185, 129, var(--intensity)), 
        rgba(16, 185, 129, calc(var(--intensity)/2))
    );
}