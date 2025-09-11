import type { ReactNode } from 'react';
import { AppSidebar } from '@/components/dashboard/sidebar';
import { AppHeader } from '@/components/dashboard/header';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { AdvancedWatchlist } from '@/components/dashboard/advanced-watchlist';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar />
      <div className="flex flex-col sm:pl-14">
        <AppHeader />
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={75}>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8 h-full overflow-y-auto">
              {children}
            </main>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
             <AdvancedWatchlist />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
