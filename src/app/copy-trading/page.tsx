import { PageShell } from "@/components/PageShell";
import { Users, TrendingUp } from "lucide-react";

const traders = [
  { name: "@smc_sniper", gain: "+184%", copiers: 1240 },
  { name: "@liquidity_hunter", gain: "+121%", copiers: 880 },
  { name: "@killzone_fx", gain: "+96%", copiers: 642 },
  { name: "@fvg_master", gain: "+74%", copiers: 410 },
];

export default function CopyTradingPage() {
  return (
    <PageShell
      title="Copy Trading"
      subtitle="Mirror trades from top ICT/SMC traders in real time. Adjust allocation per trader and pause anytime."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {traders.map((t) => (
          <div key={t.name} className="flex items-center justify-between rounded-lg border border-line bg-surface p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{t.name}</p>
                <p className="flex items-center gap-1 text-[11px] text-ink-muted">
                  <TrendingUp className="h-3 w-3 text-emerald-500" /> {t.gain} · {t.copiers} copiers
                </p>
              </div>
            </div>
            <button className="rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark">
              Copy
            </button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
