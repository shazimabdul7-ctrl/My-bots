import { PageShell } from "@/components/PageShell";
import { CandlestickChart } from "lucide-react";

export default function TradingViewPage() {
  return (
    <PageShell
      title="TradingView"
      subtitle="Embed your favorite TradingView chart directly alongside your ICT/SMC bot workspace."
    >
      <div className="rounded-lg border border-line bg-surface p-4">
        <div className="mb-3 flex items-center gap-2">
          <CandlestickChart className="h-4 w-4 text-accent-blue" />
          <h3 className="text-sm font-bold text-ink">TradingView embed</h3>
        </div>
        <div className="h-96 rounded-md bg-surface-muted">
          <div className="flex h-full items-center justify-center text-sm text-ink-faint">
            TradingView widget goes here
          </div>
        </div>
      </div>
    </PageShell>
  );
}
