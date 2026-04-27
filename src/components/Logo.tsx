import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-brand to-brand-dark text-white font-black text-[13px] leading-none shadow-sm">
        IS
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[15px] font-extrabold tracking-tight text-brand">
          ICT<span className="text-ink-muted">/</span>SMC
        </span>
        <span className="text-[9px] font-semibold tracking-[0.16em] text-ink-faint">
          POWERED BY DERIV
        </span>
      </div>
    </Link>
  );
}
