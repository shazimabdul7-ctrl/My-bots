"use client";

export function AIButton() {
  return (
    <button
      aria-label="AI assistant"
      className="fixed bottom-16 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-purple-600 text-white text-sm font-extrabold shadow-lg ring-2 ring-white/40 hover:scale-105 transition dark:ring-slate-800"
    >
      AI
    </button>
  );
}
