
import { TopMovers } from '@/components/dashboard/top-movers';
import { Heatmap } from '@/components/dashboard/heatmap';
import { AiSignals } from '@/components/dashboard/ai-signals';
import { FiiDiiData } from '@/components/dashboard/fii-dii-data';
import { MarketOverview } from '@/components/dashboard/market-overview';
import { SectoralFlow } from '@/components/dashboard/sectoral-flow';
import { IntradayBoost } from '@/components/dashboard/intraday-boost';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8">
      <MarketOverview />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            <IntradayBoost />
            <AiSignals />
          </div>
          <SectoralFlow />
        </div>
        <FiiDiiData />
      </div>
       <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TopMovers />
        </div>
        <Heatmap />
      </div>
    </div>
  );
}
