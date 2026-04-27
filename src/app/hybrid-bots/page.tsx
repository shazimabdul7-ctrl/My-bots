import { PageShell } from "@/components/PageShell";
import { Layers } from "lucide-react";

export default function HybridBotsPage() {
  return (
    <PageShell
      title="Hybrid Bots"
      subtitle="Combine multiple ICT/SMC strategies into a single hybrid bot. Weight each strategy and let the engine balance signals."
    >
      <div className="rounded-lg border border-dashed border-line bg-surface-alt p-10 text-center">
        <Layers className="mx-auto h-10 w-10 text-ink-faint" />
        <p className="mt-3 text-sm font-semibold text-ink">No hybrid bots yet</p>
        <p className="mt-1 text-xs text-ink-muted">
          Create a hybrid bot by combining two or more strategies from the Trading Bots tab.
        </p>
        <button className="mt-4 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
          Create hybrid bot
        </button>
      </div>
    </PageShell>
  );
}
