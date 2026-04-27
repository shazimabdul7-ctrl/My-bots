"use client";

import { useState } from "react";
import { Activity, Wifi, WifiOff } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { TickChart } from "@/components/TickChart";
import { ConnectDeriv } from "@/components/ConnectDeriv";
import { useTicks } from "@/lib/useTicks";
import { SYNTHETIC_SYMBOLS, DEFAULT_SYMBOL, getSymbolMeta } from "@/lib/symbols";

export default function ChartsPage() {
  const [symbol, setSymbol] = useState(DEFAULT_SYMBOL);
  const meta = getSymbolMeta(symbol);
  const { ticks, latest, direction, status, error } = useTicks(symbol);

  return (
    <PageShell
      title="Charts"
      subtitle="Live Deriv WebSocket tick feed. Select a synthetic index — data streams in real time, no account required for read-only charts."
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Symbol
          </label>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="rounded-md border border-line bg-surface-alt px-3 py-1.5 text-sm text-ink focus:border-accent-blue focus:outline-none"
          >
            {SYNTHETIC_SYMBOLS.map((s) => (
              <option key={s.symbol} value={s.symbol}>
                {s.label}
              </option>
            ))}
          </select>

          <span
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${
              status === "open"
                ? "bg-emerald-500/10 text-emerald-600"
                : status === "connecting"
                  ? "bg-amber-500/10 text-amber-600"
                  : "bg-rose-500/10 text-rose-600"
            }`}
          >
            {status === "open" ? (
              <Wifi className="h-3 w-3" />
            ) : (
              <WifiOff className="h-3 w-3" />
            )}
            {status}
          </span>
        </div>

        <ConnectDeriv />
      </div>

      <div className="rounded-lg border border-line bg-surface p-4 shadow-panel">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-accent-blue" />
            <h3 className="text-sm font-bold text-ink">{meta.label}</h3>
            <span className="rounded bg-surface-muted px-2 py-0.5 text-[11px] text-ink-muted">
              tick stream
            </span>
          </div>
          {latest && (
            <div className="flex items-baseline gap-2">
              <span
                className={`font-mono text-xl font-bold ${
                  direction > 0
                    ? "text-emerald-500"
                    : direction < 0
                      ? "text-rose-500"
                      : "text-ink"
                }`}
              >
                {latest.quote.toFixed(meta.pip)}
              </span>
              <span className="text-[11px] text-ink-faint">
                {new Date(latest.epoch * 1000).toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>

        <TickChart ticks={ticks} pip={meta.pip} height={420} />

        {error && (
          <p className="mt-3 text-xs text-rose-500" role="alert">
            {error}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-ink-muted">
          <span>Ticks received: <strong className="text-ink">{ticks.length}</strong></span>
          <span>
            Source: <code className="font-mono">wss://ws.derivws.com/websockets/v3</code>
          </span>
          <span>
            app_id: <code className="font-mono">1089</code>
          </span>
        </div>
      </div>
    </PageShell>
  );
}
