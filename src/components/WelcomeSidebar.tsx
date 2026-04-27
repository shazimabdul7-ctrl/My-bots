"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function WelcomeSidebar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <aside className="relative w-full max-w-[320px] shrink-0 border-l border-line bg-surface p-6">
      <button
        aria-label="Close welcome panel"
        onClick={() => setOpen(false)}
        className="absolute right-3 top-3 rounded p-1 text-ink-muted hover:bg-surface-muted"
      >
        <X className="h-4 w-4" />
      </button>

      <h2 className="text-lg font-bold text-ink">Welcome to ICT/SMC!</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        Ready to automate your trading strategy without writing any code? You&rsquo;ve come to the right place. Check out
        these guides and FAQs to learn more about building your bot:
      </p>

      <h3 className="mt-6 text-[15px] font-bold text-ink">Guide</h3>
      <a href="#" className="mt-2 block text-sm text-accent-blue hover:underline">
        ICT/SMC Bot &mdash; your automated trading partner
      </a>

      <h3 className="mt-6 text-[15px] font-bold text-ink">FAQs</h3>
      <ul className="mt-2 space-y-2 text-sm text-accent-blue">
        <li>
          <a href="#" className="hover:underline">
            What is ICT/SMC Bot?
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Where do I find the blocks I need?
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            How do I remove blocks from the workspace?
          </a>
        </li>
      </ul>
    </aside>
  );
}
