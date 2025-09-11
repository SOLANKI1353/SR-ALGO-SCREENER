
import { TopMovers } from '@/components/dashboard/top-movers';
import { Watchlist } from '@/components/dashboard/watchlist';
import { Heatmap } from '@/components/dashboard/heatmap';
import { AiSignals } from '@/components/dashboard/ai-signals';
import { FiiDiiData } from '@/components/dashboard/fii-dii-data';
import { MarketOverview } from '@/components/dashboard/market-overview';
import { SectoralFlow } from '@/components/dashboard/sectoral-flow';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <MarketOverview />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TopMovers />
            <Heatmap />
            <div className="md:col-span-2 lg:col-span-1">
                <Watchlist />
            </div>
        </div>
         <div className="lg:col-span-2">
            <SectoralFlow />
        </div>
      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
        <AiSignals />
        <FiiDiiData />
      </div>
    </div>
  );
}
