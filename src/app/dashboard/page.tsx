import { TopMovers } from '@/components/dashboard/top-movers';
import { Watchlist } from '@/components/dashboard/watchlist';
import { Heatmap } from '@/components/dashboard/heatmap';
import { AiSignals } from '@/components/dashboard/ai-signals';
import { TradingViewWidget } from '@/components/dashboard/trading-view-widget';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="lg:col-span-4">
                <TradingViewWidget />
            </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
            <TopMovers />
            <Heatmap />
        </div>
        <Watchlist />
      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
        <AiSignals />
      </div>
    </div>
  );
}
