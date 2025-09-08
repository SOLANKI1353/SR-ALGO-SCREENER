"use client"

import React, { useEffect, useRef, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TradingViewWidgetComponent() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current && !container.current.querySelector('script')) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BSE:RELIANCE",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "in",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    }
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>RELIANCE - TradingView Chart</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] w-full p-0">
        <div className="tradingview-widget-container h-full" ref={container}>
          <div className="tradingview-widget-container__widget h-full"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export const TradingViewWidget = memo(TradingViewWidgetComponent);
