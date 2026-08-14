/** Decorative toran / bunting strip and a scrolling filmi marquee. */

export function Bunting({ className = "" }: { className?: string }) {
  const colors = [
    "var(--mustard)",
    "var(--rose)",
    "var(--sage)",
    "var(--lavender)",
    "var(--peach)",
    "var(--wine)",
  ];
  return (
    <div className={`pointer-events-none flex w-full justify-between px-2 ${className}`} aria-hidden>
      {Array.from({ length: 18 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 34" className="h-7 w-4 shrink-0 sm:h-9 sm:w-5">
          <path d="M1 1 H19 V16 L10 31 L1 16 Z" fill={colors[i % colors.length]} opacity="0.72" />
          <circle cx="10" cy="31" r="2" fill="var(--antique-gold)" />
        </svg>
      ))}
    </div>
  );
}

export function FilmiMarquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y-2 border-dashed border-[color-mix(in_oklab,var(--wine)_30%,transparent)] py-3">
      <div className="marquee-track gap-10">
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="flex shrink-0 items-center gap-10 text-[0.62rem] tracking-[0.32em] text-primary/70 uppercase"
          >
            {t}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
