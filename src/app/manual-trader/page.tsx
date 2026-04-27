import { PageShell } from "@/components/PageShell";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function ManualTraderPage() {
  return (
    <PageShell
      title="Manual Trader"
      subtitle="Execute trades manually with ICT/SMC price-action context. Live tick data coming in Phase B."
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8 rounded-lg border border-line bg-surface p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Volatility 75 Index</p>
              <p className="mt-1 font-mono text-xl font-bold text-ink">—</p>
            </div>
            <span className="rounded bg-surface-muted px-2 py-0.5 text-[11px] text-ink-muted">awaiting tick stream</span>
          </div>

          <div className="mt-6 h-64 rounded-md bg-gradient-to-b from-accent-blue/10 to-transparent">
            <div className="flex h-full items-center justify-center text-sm text-ink-faint">
              Live chart placeholder
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-md bg-emerald-500 py-3 text-sm font-extrabold uppercase tracking-wider text-white hover:bg-emerald-600">
              <TrendingUp className="h-4 w-4" /> Rise
            </button>
            <button className="flex items-center justify-center gap-2 rounded-md bg-rose-500 py-3 text-sm font-extrabold uppercase tracking-wider text-white hover:bg-rose-600">
              <TrendingDown className="h-4 w-4" /> Fall
            </button>
          </div>
        </div>

        <aside className="col-span-12 md:col-span-4 space-y-3 rounded-lg border border-line bg-surface p-4">
          <Field label="Symbol" value="Volatility 75 Index" />
          <Field label="Trade type" value="Rise / Fall" />
          <Field label="Duration" value="5 ticks" />
          <Field label="Stake (USD)" value="1.00" />
          <Field label="Take profit" value="5.00" />
          <Field label="Stop loss" value="2.00" />
        </aside>
      </div>
    </PageShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{label}</span>
      <div className="mt-1 rounded-md border border-line bg-surface-alt px-3 py-2 text-sm text-ink">{value}</div>
    </label>
  );
}
