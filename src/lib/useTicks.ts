"use client";

import { useEffect, useRef, useState } from "react";
import { getDerivClient, type ConnectionStatus, type DerivMessage } from "./deriv";

export type Tick = { epoch: number; quote: number };

/**
 * Subscribe to a Deriv symbol's tick stream and keep the last `capacity` ticks
 * in memory. Re-subscribes when `symbol` changes. Auto-cleans on unmount.
 */
export function useTicks(symbol: string, capacity = 240) {
  const [ticks, setTicks] = useState<Tick[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const bufferRef = useRef<Tick[]>([]);

  useEffect(() => {
    bufferRef.current = [];
    setTicks([]);
    setError(null);
    const client = getDerivClient();

    const offStatus = client.onStatus(setStatus);

    const forget = client.subscribe({ ticks: symbol }, (msg: DerivMessage) => {
      if (msg.error) {
        setError(msg.error.message);
        return;
      }
      const tickMsg = msg as DerivMessage & {
        tick?: { epoch: number; quote: number };
      };
      if (tickMsg.tick) {
        const t: Tick = {
          epoch: tickMsg.tick.epoch,
          quote: tickMsg.tick.quote,
        };
        const next = [...bufferRef.current, t].slice(-capacity);
        bufferRef.current = next;
        setTicks(next);
      }
    });

    return () => {
      offStatus();
      forget();
    };
  }, [symbol, capacity]);

  const latest = ticks[ticks.length - 1] ?? null;
  const prev = ticks[ticks.length - 2] ?? null;
  const direction = latest && prev ? Math.sign(latest.quote - prev.quote) : 0;

  return { ticks, latest, direction, status, error };
}
