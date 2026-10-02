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

          {/* two postage stamps, top right */}
          <div className="absolute right-4 top-4 flex gap-1.5 sm:right-6 sm:top-6">
            {[
              { city: "Bathinda", state: "Punjab", rot: "-rotate-6", tint: "var(--mustard)", doodle: <SparkleDoodle className="w-6 text-wine" /> },
              { city: "Jamshedpur", state: "Jharkhand", rot: "rotate-6", tint: "var(--rose)", doodle: <MarigoldDoodle className="w-6 text-wine" /> },
            ].map((s) => (
              <div
                key={s.city}
                className={`flex h-[4.5rem] w-14 ${s.rot} flex-col items-center justify-center p-1 shadow-sm`}
                style={{
                  background: `color-mix(in oklab, ${s.tint} 22%, var(--card))`,
                  outline: "2px dotted color-mix(in oklab, var(--wine) 55%, transparent)",
                  outlineOffset: "-1px",
                }}
              >
                <div
                  className="flex h-full w-full flex-col items-center justify-center border text-center"
                  style={{ borderColor: "color-mix(in oklab, var(--wine) 30%, transparent)" }}
                >
                  <span className="text-[7px] font-semibold uppercase tracking-wider text-wine">{s.city}</span>
                  {s.doodle}
                  <span className="text-[6px] uppercase tracking-widest text-wine/70">{s.state}</span>
                </div>
              </div>
            ))}
          </div>

          {/* invite line */}
          <p className="hand mt-2 -rotate-2 text-2xl text-wine/80">
            Psst… you're invited.
          </p>

          {/* names */}
          <div className="py-2 text-center">
            <h1 className="poster-title text-4xl leading-tight tracking-tight sm:text-5xl">
              {COUPLE.bride}
              <span className="flex items-center justify-center gap-2 py-1">
                <SparkleDoodle className="w-4 text-gold" />
                <span className="text-2xl text-gold">♡</span>
                <SparkleDoodle className="w-4 text-gold" />
              </span>
              {COUPLE.groom}
            </h1>
            <div className="mt-2 flex items-center justify-center gap-3" aria-hidden>
              <MarigoldDoodle className="w-5 text-mustard" />
              <HeartDoodle className="w-4 text-rose" />
              <StarDoodle className="w-4 text-lavender" />
              <HeartDoodle className="w-4 text-sage" />
              <MarigoldDoodle className="w-5 text-mustard" />
            </div>
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
              <span className="absolute inset-0 animate-ping rounded-full border-2 border-wine opacity-20" />
              <svg
                viewBox="0 0 100 100"
                className="relative h-20 w-20 drop-shadow-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 group-active:scale-95"
              >
                <defs>
                  <radialGradient id="wax" cx="38%" cy="32%" r="70%">
                    <stop offset="0%" stopColor="color-mix(in oklab, var(--wine) 60%, white)" />
                    <stop offset="55%" stopColor="var(--wine)" />
                    <stop offset="100%" stopColor="color-mix(in oklab, var(--wine) 70%, black)" />
                  </radialGradient>
                </defs>
                {/* irregular wax blob */}
                <path
                  d="M50 4c8 0 11 5 18 7s13 1 17 8 1 12 4 19 7 11 5 19-8 9-11 15-3 13-10 17-13 0-23 3-13 6-20 2-6-10-12-14-12-6-15-13 2-12 0-19-6-12-2-19 10-7 14-12 8-10 15-13 10-4 15-4z"
                  fill="url(#wax)"
                />
                <circle cx="50" cy="50" r="30" fill="none" stroke="color-mix(in oklab, var(--wine) 65%, black)" strokeWidth="2" />
                <circle cx="50" cy="50" r="26" fill="none" stroke="color-mix(in oklab, var(--wine) 50%, white)" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.7" />
                <text
                  x="50"
                  y="58"
                  textAnchor="middle"
                  fontFamily="Fraunces, serif"
                  fontSize="22"
                  fontWeight="700"
                  fill="color-mix(in oklab, var(--wine) 45%, white)"
                >
                  A♡V
                </text>
                <ellipse cx="36" cy="28" rx="10" ry="5" fill="white" opacity="0.18" transform="rotate(-25 36 28)" />
              </svg>
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
