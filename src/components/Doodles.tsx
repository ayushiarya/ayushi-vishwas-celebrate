// Hand-drawn decorative vocabulary — hearts, marigolds, sparkles, vines, bows.
// All strokes use currentColor so they inherit the section's palette.

type P = { className?: string; strokeWidth?: number };

const base = "pointer-events-none select-none";

export function HeartDoodle({ className = "", strokeWidth = 1.4 }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={`${base} ${className}`}>
      <path
        d="M12 20.5c-1.6-1.4-7.5-5.2-8.4-9.4C2.9 7.7 5.1 5 7.9 5c1.9 0 3.3 1.1 4.1 2.6C12.8 6.1 14.2 5 16.1 5c2.8 0 5 2.7 4.3 6.1-.9 4.2-6.8 8-8.4 9.4Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkleDoodle({ className = "", strokeWidth = 1.3 }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={`${base} ${className}`}>
      <path
        d="M12 2.5c.6 5 1.9 6.4 7 7.2-5.1.8-6.4 2.2-7 7.2-.6-5-1.9-6.4-7-7.2 5.1-.8 6.4-2.2 7-7.2Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path d="M18.5 15.5c.3 2.3.9 3 3.2 3.4-2.3.4-2.9 1.1-3.2 3.4-.3-2.3-.9-3-3.2-3.4 2.3-.4 2.9-1.1 3.2-3.4Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

export function MarigoldDoodle({ className = "", strokeWidth = 1.2 }: P) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={`${base} ${className}`}>
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="20" cy="10.5" rx="4.6" ry="8" transform={`rotate(${i * 45} 20 20)`} />
        ))}
        <circle cx="20" cy="20" r="4.4" />
        <circle cx="20" cy="20" r="1.4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function LeafSprigDoodle({ className = "", strokeWidth = 1.2 }: P) {
  return (
    <svg viewBox="0 0 60 30" fill="none" aria-hidden className={`${base} ${className}`}>
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
        <path d="M2 26C14 24 34 18 58 5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${10 + i * 10} ${23 - i * 3.4}c1-4 4.5-6 8-6.2-1 4.2-4 6.4-8 6.2Z`}
            strokeLinejoin="round"
          />
        ))}
      </g>
    </svg>
  );
}

export function SquiggleDoodle({ className = "", strokeWidth = 1.3 }: P) {
  return (
    <svg viewBox="0 0 120 14" fill="none" aria-hidden className={`${base} ${className}`}>
      <path
        d="M2 8c8-9 16 5 24 0s16-9 24-4 16 9 24 4 16-9 24-4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BowDoodle({ className = "", strokeWidth = 1.3 }: P) {
  return (
    <svg viewBox="0 0 40 28" fill="none" aria-hidden className={`${base} ${className}`}>
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round">
        <path d="M20 12c-3-6-9-9-12-6s0 9 12 6Z" />
        <path d="M20 12c3-6 9-9 12-6s0 9-12 6Z" />
        <circle cx="20" cy="12.5" r="2" />
        <path d="M18 15c-1.5 4-3.5 6.5-6 8M22 15c1.5 4 3.5 6.5 6 8" />
      </g>
    </svg>
  );
}

export function StarDoodle({ className = "", strokeWidth = 1.3 }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={`${base} ${className}`}>
      <path
        d="M12 3.5 14.3 9l5.7.5-4.3 3.9 1.3 5.7L12 16l-5 3.1 1.3-5.7L4 9.5 9.7 9 12 3.5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A gently arched divider with a marigold at the centre. */
export function DoodleDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold/70 ${className}`}>
      <SquiggleDoodle className="w-16 opacity-60 sm:w-24" />
      <MarigoldDoodle className="w-7 shrink-0 float-slow" />
      <SquiggleDoodle className="w-16 -scale-x-100 opacity-60 sm:w-24" />
    </div>
  );
}
