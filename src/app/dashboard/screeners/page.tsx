
import { OpeningRangeBreakout } from "@/components/dashboard/opening-range-breakout";
import { AdvanceDecline } from "@/components/dashboard/advance-decline";

export default function ScreenersPage() {
  return (
    <div className="grid gap-6">
      <AdvanceDecline />
      <OpeningRangeBreakout />
    </div>
  );
}
