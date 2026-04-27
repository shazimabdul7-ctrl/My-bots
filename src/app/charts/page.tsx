import { PageShell } from "@/components/PageShell";
import { BarChart3 } from "lucide-react";

export default function ChartsPage() {
  return (
    <PageShell
      title="Charts"
      subtitle="Custom ICT/SMC charting with liquidity, order blocks, and FVG overlays. Live Deriv tick feed arrives in Phase B."
    >
      <div className="rounded-lg border border-line bg-surface p-4">
        <div className="mb-3 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-accent-blue" />
          <h3 className="text-sm font-bold text-ink">V75 · 1m</h3>
        </div>
        <div className="h-96 rounded-md bg-[repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(148,163,184,0.12)_24px,rgba(148,163,184,0.12)_25px),repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(148,163,184,0.12)_40px,rgba(148,163,184,0.12)_41px)]">
          <div className="flex h-full items-center justify-center text-sm text-ink-faint">
            Chart loads in Phase B (Deriv WebSocket)
          </div>
        </div>
      </div>
    </PageShell>
  );
}
