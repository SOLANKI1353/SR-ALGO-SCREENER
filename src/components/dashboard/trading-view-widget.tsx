"use client"

import React, { useEffect, useRef, memo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

function TradingViewWidgetComponent() {
  const searchParams = useSearchParams();
  const container = useRef<HTMLDivElement>(null);
  const [symbol, setSymbol] = useState(searchParams.get('symbol') || "TVC:NIFTY50");
  const [inputSymbol, setInputSymbol] = useState(symbol.split(':')[1] || "NIFTY50");
  const { theme } = useTheme();

  useEffect(() => {
    const urlSymbol = searchParams.get('symbol');
    if (urlSymbol && urlSymbol !== symbol) {
        setSymbol(urlSymbol);
        setInputSymbol(urlSymbol.includes(':') ? urlSymbol.split(':')[1] : urlSymbol);
    }
  }, [searchParams, symbol]);

  useEffect(() => {
    if (container.current && symbol) {
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
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
        container.current.appendChild(script);
    }
  }, [symbol, theme]);

  const handleSymbolChange = () => {
    let processedSymbol = inputSymbol.toUpperCase().trim();
    if (processedSymbol && !processedSymbol.includes(':')) {
        if (['NIFTY50', 'NIFTY', 'SENSEX', 'BANKNIFTY'].includes(processedSymbol)) {
            processedSymbol = `TVC:${processedSymbol}`;
        } else {
            processedSymbol = `NSE:${processedSymbol}`;
        }
    }
    setSymbol(processedSymbol);
  }

  return (
    <Card className="h-full">
      <CardHeader>
          <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-4'>
            <CardTitle>{symbol} - TradingView Chart</CardTitle>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                    type="text" 
                    placeholder="e.g., NIFTY50, RELIANCE" 
                    value={inputSymbol}
                    onChange={(e) => setInputSymbol(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSymbolChange()}
                />
                <Button onClick={handleSymbolChange}>Load Chart</Button>
            </div>
        </div>
      </CardHeader>
      <CardContent className="h-[900px] w-full p-0">
        <div className="tradingview-widget-container h-full" ref={container}>
          <div className="tradingview-widget-container__widget h-full"></div>
        </div>
      </CardContent>
    </Card>
  );
}

const TradingViewWidgetSuspenseWrapper = () => (
    <Suspense fallback={<div>Loading Chart...</div>}>
        <TradingViewWidgetComponent />
    </Suspense>
);


export const TradingViewWidget = memo(TradingViewWidgetSuspenseWrapper);
