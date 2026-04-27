import { WelcomeSidebar } from "@/components/WelcomeSidebar";
import { Computer, Puzzle, HardDrive, Shuffle } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    label: "My computer",
    description: "Import a bot XML from your local files",
    icon: Computer,
    color: "text-slate-500",
    href: "/bot-builder",
  },
  {
    label: "Google Drive",
    description: "Import a bot from Google Drive",
    icon: HardDrive,
    color: "text-amber-500",
    href: "/bot-builder",
  },
  {
    label: "Bot builder",
    description: "Build a new bot visually with blocks",
    icon: Puzzle,
    color: "text-emerald-500",
    href: "/bot-builder",
  },
  {
    label: "Quick strategy",
    description: "Start from a pre-built ICT/SMC strategy",
    icon: Shuffle,
    color: "text-sky-500",
    href: "/bot-builder",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex w-full">
      <div className="flex flex-1 flex-col items-center justify-start px-6 py-16">
        <h1 className="text-center text-xl font-bold text-ink">Load or build your bot</h1>
        <p className="mt-3 max-w-xl text-center text-sm text-ink-muted">
          Import a bot from your computer or Google Drive, build it from scratch, or start with a{" "}
          <a href="#" className="text-accent-blue hover:underline">
            quick strategy
          </a>
          .
        </p>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.label}
                href={c.href}
                className="group flex flex-col items-center gap-3 rounded-xl border border-line bg-surface p-5 text-center shadow-panel transition hover:-translate-y-0.5 hover:border-accent-blue hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-surface-muted group-hover:bg-accent-blue/10">
                  <Icon className={`h-7 w-7 ${c.color}`} />
                </div>
                <span className="text-sm font-semibold text-ink">{c.label}</span>
                <span className="text-[11px] leading-snug text-ink-faint">{c.description}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <WelcomeSidebar />
    </div>
  );
}
