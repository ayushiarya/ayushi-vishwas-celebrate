import { useEffect, useState } from "react";
import { COUPLE } from "@/lib/wedding";
import { Bunting } from "@/components/Bunting";
import {
  HeartDoodle,
  MarigoldDoodle,
  SparkleDoodle,
  StarDoodle,
  SquiggleDoodle,
} from "@/components/Doodles";

type Phase = "closed" | "opening" | "letter" | "gone";

export function Envelope({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("closed");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase === "opening") {
      const t = setTimeout(() => setPhase("letter"), 900);
      return () => clearTimeout(t);
    }
    if (phase === "letter") {
      const t = setTimeout(() => setPhase("gone"), 2400);
      return () => clearTimeout(t);
    }
    if (phase === "gone") {
      const t = setTimeout(onDone, 900);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, onDone]);

  if (phase === "gone") {
    return (
      <div className="pointer-events-none fixed inset-0 z-[60] bg-ivory opacity-0 transition-opacity duration-700" />
    );
  }

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center overflow-hidden px-5 transition-opacity duration-700 ${
        phase === "letter" ? "opacity-0" : "opacity-100"
      }`}
      style={{
        perspective: "1400px",
        background:
          "radial-gradient(60% 45% at 15% 10%, color-mix(in oklab, var(--peach) 34%, transparent), transparent 70%)," +
          "radial-gradient(55% 40% at 85% 18%, color-mix(in oklab, var(--lavender) 30%, transparent), transparent 70%)," +
          "radial-gradient(60% 45% at 12% 85%, color-mix(in oklab, var(--sage) 28%, transparent), transparent 70%)," +
          "radial-gradient(55% 40% at 88% 88%, color-mix(in oklab, var(--rose) 30%, transparent), transparent 70%)," +
          "var(--ivory)",
      }}
    >
      {/* festive bunting across the top */}
      <Bunting className="absolute inset-x-0 top-0 opacity-90" />

      {/* scattered doodles */}
      <SparkleDoodle className="absolute left-[10%] top-[24%] w-8 text-gold twinkle" />
      <StarDoodle className="absolute right-[12%] top-[32%] w-6 text-lavender twinkle" />
      <HeartDoodle className="absolute bottom-[16%] left-[12%] w-7 text-rose twinkle" />
      <MarigoldDoodle className="absolute bottom-[20%] right-[10%] w-10 text-mustard float-slow" />
      <MarigoldDoodle className="absolute left-[7%] top-[50%] w-8 text-sage/80 float-slow" />
      <HeartDoodle className="absolute right-[7%] top-[56%] w-6 text-peach float-slow" />
      <SparkleDoodle className="absolute left-[22%] bottom-[8%] w-5 text-lavender twinkle" />
      <SquiggleDoodle className="absolute right-[20%] top-[14%] w-16 text-rose/60 rotate-6" />

      {/* the postcard */}
      <div
        className={`relative w-full max-w-md transition-all duration-700 ease-in-out ${
          phase === "closed"
            ? "rotate-0 opacity-100"
            : "-translate-y-10 rotate-6 scale-90 opacity-0"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden border-2 bg-card p-6 shadow-[12px_14px_0_color-mix(in_oklab,var(--wine)_12%,transparent)] transition-transform duration-500 hover:rotate-1 sm:p-8"
          style={{ borderColor: "color-mix(in oklab, var(--wine) 70%, transparent)" }}
        >
          {/* hand-drawn doodle border */}
          <div
            className="pointer-events-none absolute inset-2 border border-dashed"
            style={{
              borderColor: "color-mix(in oklab, var(--wine) 30%, transparent)",
              borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
            }}
          />

          {/* hand-drawn stamp, top right */}
          <div
            className="absolute right-5 top-5 flex h-20 w-16 rotate-6 flex-col items-center justify-center border-2 bg-card p-1 sm:right-6 sm:top-6"
            style={{ borderColor: "color-mix(in oklab, var(--wine) 70%, transparent)" }}
          >
            <div
              className="flex h-full w-full flex-col items-center justify-center border"
              style={{ borderColor: "color-mix(in oklab, var(--wine) 20%, transparent)" }}
            >
              <span className="eyebrow text-[9px]">India</span>
              <MarigoldDoodle className="w-7 text-wine" />
              <span className="eyebrow text-[9px]">Shaadi 2026</span>
            </div>
          </div>

          {/* invite line */}
          <p className="hand mt-2 -rotate-2 text-2xl text-wine/80">
            Psst… you're invited.
          </p>

          {/* names */}
          <div className="py-2 text-center">
            <h1 className="poster-title text-4xl leading-tight tracking-tight sm:text-5xl">
              {COUPLE.bride}
              <span className="block py-1 text-2xl text-gold">♡</span>
              {COUPLE.groom}
            </h1>
          </div>

          {/* address lines + tap target */}
          <div className="flex items-end justify-between">
            <div className="space-y-1.5">
              <div className="h-px w-24 bg-wine/40" />
              <div className="h-px w-32 bg-wine/40" />
              <div className="h-px w-20 bg-wine/40" />
            </div>

            <button
              type="button"
              onClick={() => setPhase("opening")}
              aria-label="Open the invitation"
              className="group relative"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-wine text-ivory shadow-lg transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-active:scale-95">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-6 w-6"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="absolute inset-0 animate-ping rounded-full border-2 border-wine opacity-20" />
            </button>
          </div>

          {/* floral doodle accent */}
          <MarigoldDoodle className="pointer-events-none absolute bottom-7 left-7 w-12 text-wine/20" />
        </div>

        {/* tap hint */}
        <p
          className={`hand mt-6 text-center text-2xl transition-opacity duration-500 ${
            phase === "closed" ? "opacity-100" : "opacity-0"
          }`}
        >
          Tap the seal. The shaadi madness begins here.
        </p>
      </div>
    </div>
  );
}
