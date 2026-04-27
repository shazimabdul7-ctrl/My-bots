import { PageShell } from "@/components/PageShell";
import { Puzzle, Play, Save, Download, Upload, Undo2, Redo2 } from "lucide-react";

const categories = [
  { name: "Trade parameters", count: 6, color: "bg-emerald-500" },
  { name: "Purchase conditions", count: 8, color: "bg-sky-500" },
  { name: "Sell conditions", count: 5, color: "bg-amber-500" },
  { name: "Strategy logic", count: 12, color: "bg-violet-500" },
  { name: "Analysis", count: 9, color: "bg-rose-500" },
  { name: "Utility", count: 7, color: "bg-slate-500" },
];

export default function BotBuilderPage() {
  return (
    <PageShell
      title="Bot Builder"
      subtitle="Drag-and-drop blocks to build your automated trading strategy — no coding required."
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { label: "Run", icon: Play, cls: "bg-brand text-white hover:bg-brand-dark" },
          { label: "Save", icon: Save },
          { label: "Import", icon: Upload },
          { label: "Export", icon: Download },
          { label: "Undo", icon: Undo2 },
          { label: "Redo", icon: Redo2 },
        ].map((b) => {
          const Icon = b.icon;
          return (
            <button
              key={b.label}
              className={`flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-sm font-semibold ${b.cls ?? "bg-surface text-ink hover:bg-surface-muted"}`}
            >
              <Icon className="h-3.5 w-3.5" /> {b.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <aside className="col-span-12 md:col-span-3 rounded-lg border border-line bg-surface-alt p-3">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-muted">Block categories</h3>
          <ul className="space-y-1.5">
            {categories.map((c) => (
              <li
                key={c.name}
                className="flex items-center justify-between rounded-md border border-line bg-surface px-3 py-2 text-sm"
              >
                <span className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${c.color}`} />
                  <span className="font-medium text-ink">{c.name}</span>
                </span>
                <span className="text-[11px] text-ink-faint">{c.count}</span>
              </li>
            ))}
          </ul>
        </aside>

        <section className="col-span-12 md:col-span-9 h-[420px] rounded-lg border border-dashed border-line bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(148,163,184,0.08)_10px,rgba(148,163,184,0.08)_11px)]">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Puzzle className="h-10 w-10 text-ink-faint" />
            <p className="mt-3 text-sm font-semibold text-ink">Empty workspace</p>
            <p className="mt-1 max-w-xs text-xs text-ink-muted">
              Drag blocks from the left panel to start building your ICT/SMC strategy.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
