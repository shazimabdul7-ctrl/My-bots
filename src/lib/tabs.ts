import {
  LayoutDashboard,
  Puzzle,
  LineChart,
  Bot,
  Layers,
  Zap,
  Activity,
  Users,
  BarChart3,
  CandlestickChart,
  type LucideIcon,
} from "lucide-react";

export type Tab = {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

export const TABS: Tab[] = [
  { key: "dashboard", label: "Dashboard", href: "/", icon: LayoutDashboard },
  { key: "bot-builder", label: "Bot Builder", href: "/bot-builder", icon: Puzzle },
  { key: "manual-trader", label: "Manual Trader", href: "/manual-trader", icon: LineChart },
  { key: "trading-bots", label: "Trading Bots", href: "/trading-bots", icon: Bot },
  { key: "hybrid-bots", label: "Hybrid Bots", href: "/hybrid-bots", icon: Layers },
  { key: "speed-bots", label: "SpeedBots", href: "/speed-bots", icon: Zap },
  { key: "analysis-tool", label: "Analysis Tool", href: "/analysis-tool", icon: Activity },
  { key: "copy-trading", label: "Copy Trading", href: "/copy-trading", icon: Users },
  { key: "charts", label: "Charts", href: "/charts", icon: BarChart3 },
  { key: "tradingview", label: "TradingView", href: "/tradingview", icon: CandlestickChart },
];
