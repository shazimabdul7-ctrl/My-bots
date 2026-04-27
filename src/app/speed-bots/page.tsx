import { PageShell } from "@/components/PageShell";
import { Zap } from "lucide-react";

const speedBots = [
  { name: "Tick Scalper", ticks: "1 tick", risk: "High" },
  { name: "Micro Flip", ticks: "2 ticks", risk: "High" },
  { name: "Fast FVG", ticks: "3 ticks", risk: "Medium" },
  { name: "Momentum 5", ticks: "5 ticks", risk: "Medium" },
];

export default function SpeedBotsPage() {
  return (
    <PageShell
      title="SpeedBots"
      subtitle="Ultra-short-duration bots optimized for tick-level entries. High frequency, high variance."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {speedBots.map((b) => (
          <div key={b.name} className="rounded-lg border border-line bg-surface p-4 text-center">
            <Zap className="mx-auto h-6 w-6 text-amber-500" />
            <h3 className="mt-2 text-sm font-bold text-ink">{b.name}</h3>
            <p className="mt-1 text-[11px] text-ink-muted">{b.ticks}</p>
            <span
              className={`mt-3 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                b.risk === "High" ? "bg-rose-500/10 text-rose-500" : "bg-amber-500/10 text-amber-600"
              }`}
            >
              {b.risk} risk
            </span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
