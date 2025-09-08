import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TradingViewWidget() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>RELIANCE - TradingView Chart</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] w-full p-0">
        <Image
          src="https://picsum.photos/1200/800"
          alt="TradingView Chart Placeholder"
          data-ai-hint="stock chart"
          width={1200}
          height={800}
          className="h-full w-full object-cover"
        />
      </CardContent>
    </Card>
  );
}
