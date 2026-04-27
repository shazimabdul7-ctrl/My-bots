"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Loader2, Wifi, WifiOff } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { TickChart } from "@/components/TickChart";
import { ConnectDeriv } from "@/components/ConnectDeriv";
import { useTicks } from "@/lib/useTicks";
import { SYNTHETIC_SYMBOLS, DEFAULT_SYMBOL, getSymbolMeta } from "@/lib/symbols";
import { getDerivClient, type DerivMessage } from "@/lib/deriv";

type TradeLog = {
  id: string;
  at: number;
  type: "CALL" | "PUT";
  status: "placing" | "success" | "error";
  detail: string;
};

export default function ManualTraderPage() {
  const [symbol, setSymbol] = useState(DEFAULT_SYMBOL);
  const [stake, setStake] = useState(1);
  const [duration, setDuration] = useState(5);
  const [currency, setCurrency] = useState("USD");
  const [authed, setAuthed] = useState(false);
  const [placing, setPlacing] = useState<"CALL" | "PUT" | null>(null);
  const [log, setLog] = useState<TradeLog[]>([]);

  const meta = getSymbolMeta(symbol);
  const { ticks, latest, direction, status } = useTicks(symbol);

  const place = async (contractType: "CALL" | "PUT") => {
    setPlacing(contractType);
    const entryId = `${Date.now()}-${contractType}`;
    setLog((l) =>
      [
        {
          id: entryId,
          at: Date.now(),
          type: contractType,
          status: "placing" as const,
          detail: "requesting proposal…",
        },
        ...l,
      ].slice(0, 20),
    );

    try {
      const proposal = await getDerivClient().send({
        proposal: 1,
        contract_type: contractType,
        currency,
        symbol,
        amount: stake,
        basis: "stake",
        duration,
        duration_unit: "t",
      });

      const p = (proposal as DerivMessage & {
        proposal?: { id: string; ask_price: number; display_value: string };
      }).proposal;
      if (!p) throw new Error("no proposal returned");

      const buy = await getDerivClient().send({
        buy: p.id,
        price: p.ask_price,
      });

      const b = (buy as DerivMessage & {
        buy?: { contract_id: number; buy_price: number; longcode: string };
      }).buy;
      if (!b) throw new Error("buy rejected");

      setLog((l) =>
        l.map((e) =>
          e.id === entryId
            ? {
                ...e,
                status: "success",
                detail: `#${b.contract_id} @ ${b.buy_price} ${currency}`,
              }
            : e,
        ),
      );
    } catch (e) {
      setLog((l) =>
        l.map((entry) =>
          entry.id === entryId
            ? { ...entry, status: "error", detail: (e as Error).message }
            : entry,
        ),
      );
    } finally {
      setPlacing(null);
    }
  };

  return (
    <PageShell
      title="Manual Trader"
      subtitle="Execute real Rise/Fall contracts via the Deriv API. Connect your account, tune the trade, then click Rise or Fall."
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span
          className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${
            status === "open"
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-amber-500/10 text-amber-600"
          }`}
        >
          {status === "open" ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
          {status}
        </span>
        <ConnectDeriv onChange={setAuthed} />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8 rounded-lg border border-line bg-surface p-4 shadow-panel">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {meta.label}
              </p>
              <p
                className={`mt-1 font-mono text-xl font-bold ${
                  direction > 0
                    ? "text-emerald-500"
                    : direction < 0
                      ? "text-rose-500"
                      : "text-ink"
                }`}
              >
                {latest ? latest.quote.toFixed(meta.pip) : "—"}
              </p>
            </div>
            <span className="rounded bg-surface-muted px-2 py-0.5 text-[11px] text-ink-muted">
              {ticks.length} ticks
            </span>
          </div>

          <div className="mt-4">
            <TickChart ticks={ticks} pip={meta.pip} height={280} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => place("CALL")}
              disabled={!authed || placing !== null || !latest}
              className="flex items-center justify-center gap-2 rounded-md bg-emerald-500 py-3 text-sm font-extrabold uppercase tracking-wider text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
            >
              {placing === "CALL" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <TrendingUp className="h-4 w-4" />
              )}
              Rise
            </button>
            <button
              onClick={() => place("PUT")}
              disabled={!authed || placing !== null || !latest}
              className="flex items-center justify-center gap-2 rounded-md bg-rose-500 py-3 text-sm font-extrabold uppercase tracking-wider text-white hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
            >
              {placing === "PUT" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              Fall
            </button>
          </div>

          {!authed && (
            <p className="mt-3 text-center text-xs text-ink-faint">
              Connect a Deriv token above to enable Rise/Fall.
            </p>
          )}
        </div>

        <aside className="col-span-12 md:col-span-4 space-y-3 rounded-lg border border-line bg-surface p-4 shadow-panel">
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              Symbol
            </span>
            <select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="mt-1 w-full rounded-md border border-line bg-surface-alt px-3 py-2 text-sm text-ink focus:border-accent-blue focus:outline-none"
            >
              {SYNTHETIC_SYMBOLS.map((s) => (
                <option key={s.symbol} value={s.symbol}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              Duration (ticks)
            </span>
            <input
              type="number"
              min={1}
              max={10}
              value={duration}
              onChange={(e) => setDuration(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
              className="mt-1 w-full rounded-md border border-line bg-surface-alt px-3 py-2 font-mono text-sm text-ink focus:border-accent-blue focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              Stake
            </span>
            <div className="mt-1 flex gap-2">
              <input
                type="number"
                min={0.35}
                step={0.1}
                value={stake}
                onChange={(e) => setStake(Math.max(0.35, Number(e.target.value) || 0.35))}
                className="flex-1 rounded-md border border-line bg-surface-alt px-3 py-2 font-mono text-sm text-ink focus:border-accent-blue focus:outline-none"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-md border border-line bg-surface-alt px-2 py-2 text-sm text-ink focus:border-accent-blue focus:outline-none"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>BTC</option>
                <option>ETH</option>
              </select>
            </div>
          </label>

          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              Recent trades
            </p>
            <div className="space-y-1 font-mono text-[11px]">
              {log.length === 0 ? (
                <p className="text-ink-faint">No trades yet.</p>
              ) : (
                log.map((e) => (
                  <div
                    key={e.id}
                    className={`truncate rounded px-2 py-1 ${
                      e.status === "success"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : e.status === "error"
                          ? "bg-rose-500/10 text-rose-600"
                          : "bg-surface-muted text-ink-muted"
                    }`}
                    title={e.detail}
                  >
                    {new Date(e.at).toLocaleTimeString()} · {e.type} · {e.detail}
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
