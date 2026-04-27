import { PageShell } from "@/components/PageShell";
import { Bot, Play, Star } from "lucide-react";

const bots = [
  { name: "ICT Liquidity Sweep", desc: "Hunts stop-loss liquidity before reversing entries.", wins: "68%", trades: 1240, fav: true },
  { name: "SMC Order Block", desc: "Enters on confirmed order-block mitigations.", wins: "72%", trades: 980, fav: true },
  { name: "Fair Value Gap Fill", desc: "Fades unfilled FVGs on lower timeframes.", wins: "64%", trades: 1567 },
  { name: "Breaker Block Pro", desc: "Trades flipped support/resistance as breaker blocks.", wins: "70%", trades: 802 },
  { name: "Asia Range Sniper", desc: "Range-breakout strategy timed to Asia session.", wins: "66%", trades: 445 },
  { name: "Silver Bullet 10AM", desc: "ICT Silver Bullet session entries.", wins: "74%", trades: 313, fav: true },
];

export default function TradingBotsPage() {
  return (
    <PageShell
      title="Trading Bots"
      subtitle="Ready-to-run ICT / Smart Money Concept strategies. Pick one, set your stake, and let it run."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bots.map((b) => (
          <div
            key={b.name}
            className="flex flex-col rounded-lg border border-line bg-surface p-4 shadow-panel transition hover:border-accent-blue"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-accent-blue" />
                <h3 className="text-[15px] font-bold text-ink">{b.name}</h3>
              </div>
              {b.fav && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
            </div>
            <p className="mt-2 text-xs text-ink-muted">{b.desc}</p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-ink-muted">
                Win rate: <b className="text-emerald-500">{b.wins}</b>
              </span>
              <span className="text-ink-muted">{b.trades} trades</span>
            </div>
            <button className="mt-4 flex items-center justify-center gap-1.5 rounded-md bg-brand py-2 text-sm font-semibold text-white hover:bg-brand-dark">
              <Play className="h-3.5 w-3.5" /> Run bot
            </button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
