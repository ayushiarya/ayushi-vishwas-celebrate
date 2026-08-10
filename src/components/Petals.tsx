import { useMemo } from "react";

export function Petals({ count = 14, opacity = 0.5 }: { count?: number; opacity?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 97) % 100}%`,
        size: 6 + ((i * 13) % 9),
        duration: 16 + ((i * 7) % 14),
        delay: -((i * 5) % 20),
        drift: `${((i % 5) - 2) * 40}px`,
      })),
    [count],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity }}
    >
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.6,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: p.drift,
          }}
        />
      ))}
    </div>
  );
}
