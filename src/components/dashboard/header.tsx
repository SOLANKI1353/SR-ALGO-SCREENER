
"use client"

import Link from "next/link"
import {
  Bell,
  PanelLeft,
  Search,
  Settings,
  Moon,
  Sun,
  Flame,
  Repeat,
  LayoutDashboard,
  ScanSearch,
  Layers,
  LineChart,
  Star,
} from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

interface AppHeaderProps {
  onWatchlistClick: () => void;
}

export function AppHeader({ onWatchlistClick }: AppHeaderProps) {
  const { setTheme, theme } = useTheme()
  const { toast } = useToast();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Flame className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Sr Algo</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/chart"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Chart
            </Link>
            <Link
              href="/dashboard/screeners"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <ScanSearch className="h-5 w-5" />
              Screeners
            </Link>
             <Link
              href="/dashboard/options"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Layers className="h-5 w-5" />
              Options
            </Link>
            <Link
              href="/dashboard/backtesting"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Repeat className="h-5 w-5" />
              Backtesting
            </Link>
             <button
                onClick={onWatchlistClick}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Star className="h-5 w-5" />
                Watchlist
              </button>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>

       <Button
        variant="ghost"
        size="icon"
        onClick={onWatchlistClick}
        className="rounded-full hidden md:flex"
      >
        <Star className="h-5 w-5" />
        <span className="sr-only">Toggle watchlist</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => toast({ title: "Demo Alert", description: "This is a sample alert popup." })}
        className="rounded-full"
      >
        <Bell className="h-5 w-5" />
        <span className="sr-only">Toggle notifications</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="rounded-full"
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
             <Avatar>
                <AvatarImage src="https://picsum.photos/32/32" alt="User Avatar" data-ai-hint="person" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><Link href="/dashboard/settings">Settings</Link></DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem><Link href="/">Logout</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
