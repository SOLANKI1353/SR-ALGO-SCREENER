"use client"

import React, { useEffect, useRef, memo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

function TradingViewWidgetComponent() {
  const container = useRef<HTMLDivElement>(null);
  const [symbol, setSymbol] = useState("BSE:RELIANCE");
  const [inputSymbol, setInputSymbol] = useState("BSE:RELIANCE");
  const { theme } = useTheme();

  useEffect(() => {
    if (container.current) {
        // Clear previous widget
        container.current.innerHTML = '';
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${symbol}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "${theme === 'dark' ? 'dark' : 'light'}",
          "style": "1",
          "locale": "in",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
        container.current.appendChild(script);
    }
  }, [symbol, theme]);

  const handleSymbolChange = () => {
    setSymbol(inputSymbol.toUpperCase());
  }

  return (
    <Card className="h-full">
      <CardHeader>
          <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-4'>
            <CardTitle>{symbol} - TradingView Chart</CardTitle>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                    type="text" 
                    placeholder="e.g. BSE:TCS" 
                    value={inputSymbol}
                    onChange={(e) => setInputSymbol(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSymbolChange()}
                />
                <Button onClick={handleSymbolChange}>Load Chart</Button>
            </div>
        </div>
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
