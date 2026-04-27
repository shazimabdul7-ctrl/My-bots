import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function LoginPage() {
  return (
    <PageShell title="Log in" subtitle="Sign in to your ICT/SMC account.">
      <div className="mx-auto max-w-sm rounded-lg border border-line bg-surface p-6 shadow-panel">
        <form className="space-y-4">
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted">Email</span>
            <input
              type="email"
              placeholder="you@email.com"
              className="mt-1 w-full rounded-md border border-line bg-surface-alt px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-md border border-line bg-surface-alt px-3 py-2 text-sm"
            />
          </label>
          <button
            type="button"
            className="w-full rounded-md bg-brand py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Log in
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-ink-muted">
          New here?{" "}
          <Link href="/signup" className="text-accent-blue hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
