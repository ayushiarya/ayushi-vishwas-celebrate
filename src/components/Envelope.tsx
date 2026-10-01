import { useEffect, useState } from "react";
import { COUPLE } from "@/lib/wedding";
import { CouplePeeking } from "@/components/EventCaricatures";
import {
  HeartDoodle,
  MarigoldDoodle,
  SparkleDoodle,
  StarDoodle,
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
      const t = setTimeout(() => setPhase("letter"), 1500);
      return () => clearTimeout(t);
    }
    if (phase === "letter") {
      const t = setTimeout(() => setPhase("gone"), 2600);
      return () => clearTimeout(t);
    }
    if (phase === "gone") {
      const t = setTimeout(onDone, 900);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  if (phase === "gone") {
    return (
      <div className="pointer-events-none fixed inset-0 z-[60] bg-ivory opacity-0 transition-opacity duration-700" />
    );
  }

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-ivory px-5 transition-opacity duration-700 ${
        phase === "letter" ? "opacity-100" : "opacity-100"
      }`}
      style={{ perspective: "1400px" }}
    >
      {/* marigold toran across the top */}
      <div className="absolute inset-x-0 top-0 flex justify-center gap-1 pt-2">
        {Array.from({ length: 24 }).map((_, i) => (
          <MarigoldDoodle
            key={i}
            className={`w-6 sm:w-8 ${i % 2 ? "text-mustard" : "text-rose"} float-slow`}
            // stagger the sway
            // eslint-disable-next-line react/no-unknown-property
            {...({ style: { animationDelay: `${(i % 6) * 0.4}s` } } as object)}
          />
        ))}
      </div>

      {/* scattered doodles */}
      <SparkleDoodle className="absolute left-[10%] top-[22%] w-8 text-gold/70 twinkle" />
      <StarDoodle className="absolute right-[12%] top-[30%] w-6 text-lavender twinkle" />
      <HeartDoodle className="absolute bottom-[16%] left-[14%] w-7 text-rose/70 twinkle" />
      <MarigoldDoodle className="absolute bottom-[20%] right-[10%] w-10 text-mustard/70 float-slow" />

      {/* now showing sticker */}
      <div className="sticker absolute left-1/2 top-[12%] -translate-x-1/2 rotate-[-3deg]">
        Now Showing · One big fat shaadi
      </div>

      <div className="relative mt-10 w-full max-w-md" style={{ transformStyle: "preserve-3d" }}>
        {/* peeking couple */}
        <CouplePeeking className="absolute -top-24 right-2 z-20 w-32 rotate-3 sm:-top-28 sm:w-40" />

        {/* envelope body */}
        <div
          className="relative overflow-hidden rounded-[26px_8px_26px_8px] border-2 shadow-[8px_10px_0_color-mix(in_oklab,var(--wine)_16%,transparent)]"
          style={{
            borderColor: "color-mix(in oklab, var(--wine) 42%, transparent)",
            background:
              "linear-gradient(160deg, color-mix(in oklab, var(--champagne) 80%, var(--card)), color-mix(in oklab, var(--blush) 45%, var(--card)))",
          }}
        >
          {/* letter inside */}
          <div
            className={`relative z-10 mx-5 mb-6 mt-10 rounded-lg bg-card p-6 text-center shadow-md transition-all duration-1000 ${
              phase === "letter"
                ? "-translate-y-40 opacity-100 sm:-translate-y-48"
                : "translate-y-2 opacity-95"
            }`}
          >
            <p className="eyebrow">Psst… you're invited.</p>
            <h2 className="poster-title mt-4 text-3xl sm:text-4xl">
              {COUPLE.bride}
              <HeartDoodle className="mx-2 inline-block w-6 -translate-y-1 text-rose" />
              {COUPLE.groom}
            </h2>
            <p className="hand mt-3 text-xl">Two hearts. One beautiful beginning.</p>
          </div>

          {/* pocket */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[11] h-2/3"
            style={{
              background:
                "linear-gradient(200deg, color-mix(in oklab, var(--champagne) 90%, var(--card)), color-mix(in oklab, var(--peach) 40%, var(--card)))",
              clipPath: "polygon(0 38%, 50% 0, 100% 38%, 100% 100%, 0 100%)",
              borderTop: "1.5px solid color-mix(in oklab, var(--antique-gold) 40%, transparent)",
            }}
          />

          {/* flap */}
          <div
            className="absolute inset-x-0 top-0 z-[12] h-1/2 origin-top transition-transform duration-[1400ms] ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              transform: phase !== "closed" ? "rotateX(180deg)" : "rotateX(0deg)",
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--blush) 55%, var(--card)), color-mix(in oklab, var(--champagne) 85%, var(--card)))",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backfaceVisibility: "hidden",
            }}
          />

          {/* wax seal */}
          {phase === "closed" && (
            <button
              type="button"
              onClick={() => setPhase("opening")}
              aria-label="Open the invitation"
              className="group absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 hover:rotate-6 hover:scale-110"
            >
              <span
                className="flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-lg shimmer-gold"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, color-mix(in oklab, var(--rose) 70%, var(--wine)), var(--wine))",
                  borderColor: "color-mix(in oklab, var(--gold) 70%, transparent)",
                }}
              >
                <span className="script text-xl text-ivory">A&amp;V</span>
              </span>
            </button>
          )}
        </div>

        {/* tap hint */}
        <p
          className={`hand mt-8 text-center text-2xl transition-opacity duration-500 ${
            phase === "closed" ? "opacity-100" : "opacity-0"
          }`}
        >
          Tap the seal. The shaadi madness begins here.
        </p>
      </div>
    </div>
  );
}
