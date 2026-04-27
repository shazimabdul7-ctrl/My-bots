"use client";

import { Logo } from "./Logo";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-surface/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-surface/70 sm:px-6">
      <div className="flex items-center gap-3">
        <Logo />
        <button
          aria-label="Community chat"
          className="ml-1 flex h-7 items-center gap-1 rounded-md bg-brand/10 px-2 text-[11px] font-semibold text-brand hover:bg-brand/20"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Community
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="rounded-md border border-accent-blue/40 bg-accent-blue/10 px-4 py-1.5 text-sm font-semibold text-accent-blue hover:bg-accent-blue/20"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="rounded-md bg-brand px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}
