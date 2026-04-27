"use client";

import { useEffect, useState } from "react";
import { X, KeyRound, LogOut, Loader2 } from "lucide-react";
import {
  getDerivClient,
  readStoredToken,
  writeStoredToken,
} from "@/lib/deriv";

type AccountInfo = {
  loginid?: string;
  currency?: string;
  balance?: number;
};

export function ConnectDeriv({ onChange }: { onChange?: (authed: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountInfo | null>(null);

  // Auto-authorize on mount if a token is stored.
  useEffect(() => {
    const stored = readStoredToken();
    if (!stored) return;
    let cancelled = false;
    (async () => {
      setBusy(true);
      try {
        const res = await getDerivClient().authorize(stored);
        if (cancelled) return;
        const auth = (res as { authorize?: AccountInfo }).authorize;
        if (auth) {
          setAccount(auth);
          onChange?.(true);
        }
      } catch (e) {
        if (cancelled) return;
        setErr((e as Error).message);
        writeStoredToken(null);
        onChange?.(false);
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async () => {
    setBusy(true);
    setErr(null);
    try {
      const res = await getDerivClient().authorize(token.trim());
      const auth = (res as { authorize?: AccountInfo }).authorize;
      if (!auth) throw new Error("unexpected auth response");
      writeStoredToken(token.trim());
      setAccount(auth);
      setOpen(false);
      setToken("");
      onChange?.(true);
    } catch (e) {
      setErr((e as Error).message);
      onChange?.(false);
    } finally {
      setBusy(false);
    }
  };

  const disconnect = () => {
    writeStoredToken(null);
    getDerivClient().clearToken();
    setAccount(null);
    onChange?.(false);
  };

  if (account) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="font-mono text-ink">{account.loginid}</span>
        <span className="text-ink-muted">
          {account.balance?.toFixed(2)} {account.currency}
        </span>
        <button
          onClick={disconnect}
          className="ml-1 rounded p-1 text-ink-muted hover:text-rose-500"
          aria-label="Disconnect Deriv"
          type="button"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md bg-accent-blue px-3 py-1.5 text-xs font-bold text-white hover:brightness-110"
        type="button"
      >
        <KeyRound className="h-3.5 w-3.5" />
        Connect Deriv
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">Connect Deriv account</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-1 text-ink-muted hover:text-ink"
                aria-label="Close"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-3 text-xs text-ink-muted">
              Generate a token at{" "}
              <a
                href="https://app.deriv.com/account/api-token"
                target="_blank"
                rel="noreferrer"
                className="text-accent-blue underline"
              >
                app.deriv.com/account/api-token
              </a>{" "}
              with <strong>Read</strong> + <strong>Trade</strong> scopes. The
              token is stored in your browser only — never sent to our server.
            </p>

            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                API token
              </span>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="a1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="mt-1 w-full rounded-md border border-line bg-surface-alt px-3 py-2 font-mono text-sm text-ink focus:border-accent-blue focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && token.trim()) submit();
                }}
              />
            </label>

            {err && (
              <p className="mt-2 text-xs text-rose-500" role="alert">
                {err}
              </p>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-md border border-line px-3 py-1.5 text-sm text-ink-muted hover:bg-surface-alt"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={busy || !token.trim()}
                className="flex items-center gap-2 rounded-md bg-accent-blue px-4 py-1.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
              >
                {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Authorize
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
