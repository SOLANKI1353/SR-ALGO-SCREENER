// Add to screener-filters:
<div class="filter-group">
    <label class="filter-label">Sector</label>
    <select class="filter-select" id="sectorFilter">
        <option value="all">All Sectors</option>
        <option value="IT">Information Technology</option>
        <option value="BANKING">Banking</option>
        <!-- Add other sectors -->
    </select>
</div>

// In JavaScript:
const sectorFilter = document.getElementById('sectorFilter');
sectorFilter.addEventListener('change', renderStockTable);

// Update renderStockTable():
const selectedSector = sectorFilter.value;
if (selectedSector !== 'all') {
    filteredStocks = filteredStocks.filter(stock => stock.sector === selectedSector);
}