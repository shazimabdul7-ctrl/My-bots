"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TABS } from "@/lib/tabs";
import { cn } from "@/lib/cn";

export function TabNav() {
  const pathname = usePathname();
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  return (
    <nav className="sticky top-14 z-20 border-b border-line bg-surface">
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-3 py-2 sm:px-4">
        {TABS.map((tab) => {
          const active = normalized === tab.href || (tab.href !== "/" && normalized.startsWith(tab.href));
          const Icon = tab.icon;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors",
                active
                  ? "bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900"
                  : "bg-accent-blue text-white hover:bg-accent-blueDark"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
