"use client";

import { useMemo } from "react";
import type { Tick } from "@/lib/useTicks";

/**
 * Lightweight SVG line chart for a stream of ticks. No external dep — sized
 * via the parent's width/height props, auto-scales on min/max.
 */
export function TickChart({
  ticks,
  pip = 4,
  height = 360,
}: {
  ticks: Tick[];
  pip?: number;
  height?: number;
}) {
  const { path, min, max, fillPath } = useMemo(() => {
    if (ticks.length < 2) return { path: "", min: 0, max: 0, fillPath: "" };
    const quotes = ticks.map((t) => t.quote);
    const minQ = Math.min(...quotes);
    const maxQ = Math.max(...quotes);
    const range = maxQ - minQ || 1;
    const pad = range * 0.1;
    const lo = minQ - pad;
    const hi = maxQ + pad;
    const H = height;
    const W = 1000;

    const x = (i: number) => (i / (ticks.length - 1)) * W;
    const y = (q: number) => H - ((q - lo) / (hi - lo)) * H;

    const d = ticks
      .map((t, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(t.quote).toFixed(2)}`)
      .join(" ");

    const fill = `${d} L${x(ticks.length - 1).toFixed(2)},${H} L${x(0).toFixed(2)},${H} Z`;

    return { path: d, min: lo, max: hi, fillPath: fill };
  }, [ticks, height]);

  const last = ticks[ticks.length - 1];
  const first = ticks[0];
  const rising = last && first ? last.quote >= first.quote : true;
  const stroke = rising ? "#10b981" : "#ef4444";
  const fill = rising ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)";

  return (
    <div
      className="relative w-full overflow-hidden rounded-md bg-surface-alt"
      style={{ height }}
    >
      {ticks.length < 2 ? (
        <div className="flex h-full items-center justify-center text-sm text-ink-faint">
          Waiting for ticks…
        </div>
      ) : (
        <>
          <svg
            viewBox={`0 0 1000 ${height}`}
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path d={fillPath} fill={fill} />
            <path d={path} fill="none" stroke={stroke} strokeWidth={1.5} />
          </svg>
          <div className="pointer-events-none absolute left-2 top-2 rounded bg-black/40 px-2 py-0.5 text-[11px] font-mono text-white">
            high {max.toFixed(pip)}
          </div>
          <div className="pointer-events-none absolute bottom-2 left-2 rounded bg-black/40 px-2 py-0.5 text-[11px] font-mono text-white">
            low {min.toFixed(pip)}
          </div>
          {last && (
            <div
              className="pointer-events-none absolute right-2 top-2 rounded px-2 py-0.5 text-[11px] font-mono text-white"
              style={{ background: stroke }}
            >
              {last.quote.toFixed(pip)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
