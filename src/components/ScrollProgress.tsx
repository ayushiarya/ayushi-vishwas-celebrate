import { useEffect, useState } from "react";

/**
 * Thin vertical scroll-progress rail on the right edge.
 * A gold thumb grows downward as the guest moves through the site.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-2 top-1/2 z-50 h-[42vh] w-[3px] -translate-y-1/2 rounded-full sm:right-3"
      style={{
        background: "color-mix(in oklab, var(--antique-gold) 18%, transparent)",
      }}
    >
      <div
        className="w-full rounded-full transition-[height] duration-150 ease-out"
        style={{
          height: `${Math.max(4, progress * 100)}%`,
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--gold) 80%, transparent), var(--antique-gold))",
        }}
      />
      {/* tiny marigold dot at the tip */}
      <div
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          top: `${Math.max(4, progress * 100)}%`,
          background: "var(--rose)",
          boxShadow: "0 0 0 2px color-mix(in oklab, var(--ivory) 80%, transparent)",
          transition: "top 150ms ease-out",
        }}
      />
    </div>
  );
}
