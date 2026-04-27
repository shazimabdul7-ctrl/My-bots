import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function SignupPage() {
  return (
    <PageShell title="Sign up" subtitle="Create your free ICT/SMC account and start building bots.">
      <div className="mx-auto max-w-sm rounded-lg border border-line bg-surface p-6 shadow-panel">
        <form className="space-y-4">
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted">Full name</span>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-line bg-surface-alt px-3 py-2 text-sm"
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted">Email</span>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-line bg-surface-alt px-3 py-2 text-sm"
              placeholder="you@email.com"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted">Password</span>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-line bg-surface-alt px-3 py-2 text-sm"
              placeholder="••••••••"
            />
          </label>
          <button
            type="button"
            className="w-full rounded-md bg-brand py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Create account
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-ink-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-accent-blue hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
