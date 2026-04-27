"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import {
  Globe,
  HelpCircle,
  Maximize2,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sun,
  Send,
} from "lucide-react";

function Clock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const pad = (n: number) => n.toString().padStart(2, "0");
      return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(
        d.getUTCHours()
      )}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} GMT`;
    };
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums text-[11px] text-ink-muted">{now}</span>;
}

export function Footer() {
  const { theme, toggle } = useTheme();

  const iconBtn =
    "flex h-7 w-7 items-center justify-center rounded text-ink-muted hover:bg-surface-muted hover:text-ink";

  return (
    <footer className="sticky bottom-0 z-20 flex h-10 items-center justify-between border-t border-line bg-surface-alt px-3">
      <button className="rounded-md bg-amber-300 px-2.5 py-1 text-[11px] font-bold text-slate-900 hover:bg-amber-400">
        Risk Disclaimer
      </button>

      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]" />
        <Clock />
        <div className="mx-2 hidden h-4 w-px bg-line sm:block" />
        <a href="#" aria-label="WhatsApp" className={iconBtn}>
          <MessageCircle className="h-3.5 w-3.5" />
        </a>
        <a href="#" aria-label="Telegram" className={iconBtn}>
          <Send className="h-3.5 w-3.5" />
        </a>
        <a href="#" aria-label="Security" className={iconBtn}>
          <ShieldCheck className="h-3.5 w-3.5" />
        </a>
        <button aria-label="Toggle theme" onClick={toggle} className={iconBtn}>
          {theme === "light" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        </button>
        <a href="#" aria-label="Help" className={iconBtn}>
          <HelpCircle className="h-3.5 w-3.5" />
        </a>
        <button aria-label="Language" className="flex items-center gap-1 rounded px-1.5 py-1 text-[11px] font-semibold text-ink-muted hover:bg-surface-muted">
          <Globe className="h-3.5 w-3.5" />
          EN
        </button>
        <button aria-label="Fullscreen" className={iconBtn}>
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
}
