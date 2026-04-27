"use client";

/**
 * Minimal Deriv WebSocket client.
 *
 * - Auto-reconnect with exponential backoff (1s → 30s cap).
 * - Request/response correlation via `req_id`.
 * - `subscribe()` opens a long-lived subscription and forwards every message
 *   tagged with that `subscription.id` to the handler until `forget()`.
 * - `authorize()` caches the last token and replays it on reconnect.
 *
 * The client is safe to use client-side only (guards `typeof window`).
 */

export type DerivMessage = Record<string, unknown> & {
  req_id?: number;
  msg_type?: string;
  subscription?: { id?: string };
  error?: { code: string; message: string };
};

type Resolver = {
  resolve: (msg: DerivMessage) => void;
  reject: (err: Error) => void;
};

type Subscription = {
  id?: string;
  reqId: number;
  request: Record<string, unknown>;
  handler: (msg: DerivMessage) => void;
};

const DEFAULT_APP_ID = 1089;
const DEFAULT_ENDPOINT = "wss://ws.derivws.com/websockets/v3";

export class DerivClient {
  private ws: WebSocket | null = null;
  private reqCounter = 1;
  private pending = new Map<number, Resolver>();
  private subs = new Map<number, Subscription>();
  private token: string | null = null;
  private connecting: Promise<void> | null = null;
  private reconnectDelay = 1000;
  private manuallyClosed = false;
  private listeners = new Set<(status: ConnectionStatus) => void>();
  private status: ConnectionStatus = "idle";

  constructor(
    private endpoint: string = DEFAULT_ENDPOINT,
    private appId: number = DEFAULT_APP_ID,
  ) {}

  getStatus(): ConnectionStatus {
    return this.status;
  }

  onStatus(cb: (s: ConnectionStatus) => void): () => void {
    this.listeners.add(cb);
    cb(this.status);
    return () => this.listeners.delete(cb);
  }

  private setStatus(s: ConnectionStatus) {
    this.status = s;
    this.listeners.forEach((l) => l(s));
  }

  async connect(): Promise<void> {
    if (typeof window === "undefined") return;
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return;
    if (this.connecting) return this.connecting;

    this.manuallyClosed = false;
    this.setStatus("connecting");
    this.connecting = new Promise<void>((resolve, reject) => {
      const url = `${this.endpoint}?app_id=${this.appId}`;
      const ws = new WebSocket(url);
      this.ws = ws;

      ws.onopen = () => {
        this.reconnectDelay = 1000;
        this.setStatus("open");
        // Re-authorize + re-subscribe on reconnect.
        (async () => {
          if (this.token) {
            try {
              await this.sendRaw({ authorize: this.token });
            } catch {
              /* ignore — bubbles via status */
            }
          }
          this.subs.forEach((sub) => {
            try {
              ws.send(JSON.stringify({ ...sub.request, req_id: sub.reqId }));
            } catch {
              /* noop */
            }
          });
          resolve();
        })();
      };

      ws.onerror = () => {
        this.setStatus("error");
      };

      ws.onclose = () => {
        this.ws = null;
        this.connecting = null;
        this.setStatus("closed");
        // Fail every pending request so callers unblock.
        this.pending.forEach(({ reject: rj }) => rj(new Error("socket closed")));
        this.pending.clear();
        if (!this.manuallyClosed) this.scheduleReconnect();
      };

      ws.onmessage = (ev) => {
        let msg: DerivMessage;
        try {
          msg = JSON.parse(ev.data);
        } catch {
          return;
        }
        this.handleMessage(msg);
      };

      // Safety: reject the `connect()` promise if the socket never opens.
      const openTimer = setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) {
          this.connecting = null;
          reject(new Error("connect timeout"));
          try {
            ws.close();
          } catch {
            /* noop */
          }
        }
      }, 10_000);
      ws.addEventListener("open", () => clearTimeout(openTimer), { once: true });
    });

    try {
      await this.connecting;
    } finally {
      this.connecting = null;
    }
  }

  private scheduleReconnect() {
    const delay = this.reconnectDelay;
    this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30_000);
    setTimeout(() => {
      if (!this.manuallyClosed) this.connect().catch(() => {});
    }, delay);
  }

  private handleMessage(msg: DerivMessage) {
    const reqId = typeof msg.req_id === "number" ? msg.req_id : undefined;

    if (reqId !== undefined) {
      // First response captures subscription.id (for later forget).
      const sub = this.subs.get(reqId);
      if (sub) {
        if (msg.subscription?.id && !sub.id) sub.id = msg.subscription.id;
        sub.handler(msg);
      }

      // Resolve the one-shot `send()` waiter for this req_id.
      const pending = this.pending.get(reqId);
      if (pending) {
        this.pending.delete(reqId);
        if (msg.error) pending.reject(new Error(msg.error.message));
        else pending.resolve(msg);
      }
    }
  }

  private nextReqId(): number {
    return this.reqCounter++;
  }

  /** Fire a single request/response round-trip. */
  async send<T extends DerivMessage = DerivMessage>(
    request: Record<string, unknown>,
  ): Promise<T> {
    await this.connect();
    return this.sendRaw<T>(request);
  }

  private sendRaw<T extends DerivMessage>(
    request: Record<string, unknown>,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error("socket not open"));
        return;
      }
      const reqId = this.nextReqId();
      this.pending.set(reqId, {
        resolve: resolve as Resolver["resolve"],
        reject,
      });
      try {
        this.ws.send(JSON.stringify({ ...request, req_id: reqId }));
      } catch (err) {
        this.pending.delete(reqId);
        reject(err as Error);
      }
    });
  }

  /**
   * Open a streaming subscription. Handler is called for every message tagged
   * with the returned subscription's `req_id`. Returns a `forget` function.
   */
  subscribe(
    request: Record<string, unknown>,
    handler: (msg: DerivMessage) => void,
  ): () => void {
    const reqId = this.nextReqId();
    const sub: Subscription = {
      reqId,
      request: { ...request, subscribe: 1 },
      handler,
    };
    this.subs.set(reqId, sub);

    const sendIt = async () => {
      await this.connect();
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ ...sub.request, req_id: reqId }));
      }
    };
    sendIt().catch(() => {});

    return () => this.forget(reqId);
  }

  private forget(reqId: number) {
    const sub = this.subs.get(reqId);
    if (!sub) return;
    this.subs.delete(reqId);
    if (sub.id && this.ws?.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify({ forget: sub.id }));
      } catch {
        /* noop */
      }
    }
  }

  async authorize(token: string): Promise<DerivMessage> {
    this.token = token;
    return this.send({ authorize: token });
  }

  clearToken() {
    this.token = null;
  }

  close() {
    this.manuallyClosed = true;
    if (this.ws) {
      try {
        this.ws.close();
      } catch {
        /* noop */
      }
    }
    this.ws = null;
  }
}

export type ConnectionStatus =
  | "idle"
  | "connecting"
  | "open"
  | "closed"
  | "error";

// Singleton shared across the app (client-side only).
let _client: DerivClient | null = null;
export function getDerivClient(): DerivClient {
  if (typeof window === "undefined") {
    // Server-render placeholder — never actually used, just keeps TS happy.
    return new DerivClient();
  }
  if (!_client) _client = new DerivClient();
  return _client;
}

// ── token helpers ───────────────────────────────────────────────────────────
const TOKEN_KEY = "ictsmc-deriv-token";

export function readStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function writeStoredToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}
