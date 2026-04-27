"use client";

import { X, Layers } from "lucide-react";
import { useEffect, useState } from "react";

export function TradeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("ictsmc-welcome-seen");
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = (remember: boolean) => {
    if (remember) localStorage.setItem("ictsmc-welcome-seen", "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
        <div className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-violet-700 p-6 text-center text-white">
          <button
            aria-label="Close"
            onClick={() => dismiss(true)}
            className="absolute right-3 top-3 rounded-full bg-white/20 p-1 hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </button>
          <Layers className="mx-auto h-7 w-7" />
          <h3 className="mt-2 text-lg font-extrabold">Trade with ICT/SMC</h3>
          <p className="text-xs text-white/80">Join our trading community</p>
        </div>

        <div className="space-y-3 p-5">
          <a
            href="#"
            className="block rounded-lg bg-slate-900 py-3 text-center text-[15px] font-extrabold tracking-wide text-red-500 hover:bg-slate-800"
          >
            START TRADING
          </a>
          <a href="#" className="block text-center text-sm font-semibold text-ink">
            YouTube Channel
          </a>
          <a
            href="#"
            className="block rounded-full bg-emerald-500 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-600"
          >
            WhatsApp
          </a>
          <a
            href="#"
            className="block rounded-full bg-sky-500 py-2 text-center text-sm font-semibold text-white hover:bg-sky-600"
          >
            Telegram Channel
          </a>
          <div className="flex items-center justify-center gap-4 border-t border-line pt-3 text-[11px] text-ink-muted">
            <span>Regulated</span>
            <span>&middot;</span>
            <span>1M+ Traders</span>
            <span>&middot;</span>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <button onClick={() => dismiss(true)} className="text-ink-muted hover:underline">
              No thanks
            </button>
            <button onClick={() => dismiss(false)} className="text-ink-muted hover:underline">
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
