
"use client";

import type { ReactNode } from 'react';
import { useState } from 'react';
import { AppSidebar } from '@/components/dashboard/sidebar';
import { AppHeader } from '@/components/dashboard/header';
import { AdvancedWatchlist } from '@/components/dashboard/advanced-watchlist';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar onWatchlistClick={() => setIsWatchlistOpen(true)} />
      <div className="flex flex-col sm:pl-14">
        <AppHeader onWatchlistClick={() => setIsWatchlistOpen(true)} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8 h-full overflow-y-auto">
          {children}
        </main>
      </div>
      <Sheet open={isWatchlistOpen} onOpenChange={setIsWatchlistOpen}>
        <SheetContent className="p-0 w-full sm:max-w-md" side="right">
          <AdvancedWatchlist />
        </SheetContent>
      </Sheet>
    </div>
  );
}
