
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Settings,
  Flame,
  LayoutDashboard,
  Repeat,
  ScanSearch,
  Layers,
  LineChart,
  Star,
  BarChartHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

interface AppSidebarProps {
  onWatchlistClick: () => void;
}

export function AppSidebar({ onWatchlistClick }: AppSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/chart", icon: LineChart, label: "Chart" },
    { href: "/dashboard/screeners", icon: ScanSearch, label: "Screeners" },
    { href: "/dashboard/options", icon: Layers, label: "Options" },
    { href: "/dashboard/backtesting", icon: Repeat, label: "Backtesting" },
    { href: "/dashboard/fibonacci-screener", icon: BarChartHorizontal, label: "Fibonacci Screener"},
  ]
  
  const bottomNavItems = [
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Flame className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Sr Algo</span>
        </Link>
        <TooltipProvider>
            {navItems.map(item => (
                <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                    <Link
                        href={item.href}
                        className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                            pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard') ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="sr-only">{item.label}</span>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
            ))}
             <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onWatchlistClick}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <Star className="h-5 w-5" />
                        <span className="sr-only">Watchlist</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Watchlist</TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
            {bottomNavItems.map(item => (
                <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                    <Link
                        href={item.href}
                        className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                            pathname.startsWith(item.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="sr-only">{item.label}</span>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
            ))}
        </TooltipProvider>
      </nav>
    </aside>
  )
}
