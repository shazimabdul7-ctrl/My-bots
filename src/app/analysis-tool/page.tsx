import { PageShell } from "@/components/PageShell";
import { Activity } from "lucide-react";

export default function AnalysisToolPage() {
  return (
    <PageShell
      title="Analysis Tool"
      subtitle="Visualize market structure, liquidity pools, order blocks, and fair-value gaps across symbols."
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 rounded-lg border border-line bg-surface p-4">
          <div className="mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4 text-accent-blue" />
            <h3 className="text-sm font-bold text-ink">Market structure — V75</h3>
          </div>
          <div className="h-64 rounded-md bg-gradient-to-br from-accent-blue/10 via-violet-500/10 to-rose-500/10" />
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-3">
          {[
            { label: "Trend", value: "Bullish", color: "text-emerald-500" },
            { label: "Active liquidity", value: "2 pools", color: "text-amber-500" },
            { label: "Unmitigated FVGs", value: "4", color: "text-accent-blue" },
            { label: "Kill zone", value: "London open", color: "text-violet-500" },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3">
              <span className="text-xs text-ink-muted">{s.label}</span>
              <span className={`text-sm font-bold ${s.color}`}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
