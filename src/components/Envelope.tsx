import { useEffect, useState } from "react";
import pattern from "@/assets/pattern.jpg";
import { COUPLE } from "@/lib/wedding";
import { Bunting } from "@/components/Bunting";
import { CouplePeeking } from "@/components/EventCaricatures";
import { HeartDoodle, MarigoldDoodle, SparkleDoodle, StarDoodle } from "@/components/Doodles";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gone]);

  function handleOpen() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => onOpen(), 1500);
    window.setTimeout(() => setGone(true), 2600);
  }

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-6 transition-opacity duration-1000 ${
        opening ? "pointer-events-none opacity-0 delay-[1400ms]" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(circle at 50% 30%, oklch(0.97 0.03 85), oklch(0.9 0.06 40))",
      }}
    >
      {/* toran on top */}
      <Bunting className="absolute inset-x-0 top-0" />

      {/* scattered doodles */}
      <MarigoldDoodle className="absolute left-6 top-24 h-10 w-10 text-mustard wiggle-slow opacity-70" />
      <MarigoldDoodle className="absolute right-8 top-32 h-8 w-8 text-rose wiggle-slow opacity-70" />
      <SparkleDoodle className="absolute left-10 bottom-24 h-8 w-8 text-gold twinkle" />
      <StarDoodle className="absolute right-10 bottom-32 h-9 w-9 text-lavender twinkle" />

      <div className="relative w-full max-w-lg text-center">
        <span className="sticker mx-auto mb-3 inline-block rotate-[-3deg] text-[0.6rem] tracking-[0.28em] uppercase">
          Now showing · One big fat shaadi
        </span>
        <p className="hand mb-1 text-3xl text-primary sm:text-4xl">Psst… you&apos;re invited.</p>
        <p className="mb-7 text-[0.62rem] tracking-[0.3em] text-muted-foreground uppercase">
          One family · Two days · Zero chill
        </p>

        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open the invitation"
          className="group relative mx-auto block w-full max-w-[420px] cursor-pointer transition-transform duration-300 hover:-rotate-1 active:scale-[0.98]"
          style={{ perspective: "1400px" }}
        >
          {/* peeking couple */}
          <CouplePeeking
            className={`pointer-events-none absolute -top-16 right-2 z-[5] h-24 w-24 transition-all duration-500 ${
              opening ? "opacity-0" : "opacity-100 group-hover:-translate-y-1"
            }`}
          />

          {/* envelope body */}
          <div
            className="relative aspect-[3/2] w-full overflow-hidden shadow-[0_40px_80px_-40px_oklch(0.34_0.098_18_/_0.5)]"
            style={{
              backgroundColor: "oklch(0.955 0.03 80)",
              borderRadius: "18px 6px 20px 8px",
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.16] mix-blend-multiply"
              style={{ backgroundImage: `url(${pattern})`, backgroundSize: "260px" }}
            />

            {/* letter sliding out */}
            <div
              className={`absolute inset-x-6 bottom-6 top-8 paper flex flex-col items-center justify-center gap-2 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                opening ? "-translate-y-24 opacity-100 delay-500" : "translate-y-6 opacity-0"
              }`}
            >
              <span className="eyebrow">A love story, mostly unscripted</span>
              <span className="poster-title text-3xl text-primary sm:text-4xl">
                {COUPLE.bride} <HeartDoodle className="inline h-5 w-5 text-rose" /> {COUPLE.groom}
              </span>
              <span className="rule-gold w-24" />
              <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                24 · 25 {COUPLE.city}
              </span>
            </div>

            {/* front panels */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.94 0.05 70), oklch(0.86 0.09 35))",
                clipPath: "polygon(0 12%, 50% 62%, 100% 12%, 100% 100%, 0 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-25 mix-blend-multiply"
              style={{
                backgroundImage: `url(${pattern})`,
                backgroundSize: "220px",
                clipPath: "polygon(0 12%, 50% 62%, 100% 12%, 100% 100%, 0 100%)",
              }}
            />

            {/* flap */}
            <div
              className={`absolute inset-x-0 top-0 h-[62%] origin-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.5,0,0.2,1)] ${
                opening ? "[transform:rotateX(-172deg)]" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
                background:
                  "linear-gradient(180deg, oklch(0.92 0.06 55), oklch(0.83 0.11 32))",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                zIndex: opening ? 1 : 3,
              }}
            >
              <div
                className="absolute inset-0 opacity-30 mix-blend-multiply"
                style={{
                  backgroundImage: `url(${pattern})`,
                  backgroundSize: "220px",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              />
            </div>

            {/* wax seal / monogram */}
            <div
              className={`absolute left-1/2 top-[56%] z-[4] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-500 ${
                opening ? "scale-75 opacity-0" : "group-hover:scale-110 group-hover:rotate-6"
              }`}
              style={{
                background:
                  "radial-gradient(circle at 32% 30%, oklch(0.5 0.16 25), oklch(0.32 0.12 18))",
                boxShadow: "0 8px 20px -8px oklch(0.3 0.1 18 / 0.8)",
              }}
            >
              <span className="script text-lg text-primary-foreground">A&V</span>
              <SparkleDoodle className="absolute -right-4 -top-3 h-5 w-5 text-gold twinkle" />
            </div>
          </div>
        </button>

        <p
          className={`hand mt-6 text-2xl text-rose transition-opacity duration-500 ${
            opening ? "opacity-0" : "opacity-100"
          }`}
        >
          Tap the seal. The shaadi madness begins here.
        </p>
      </div>
    </div>
  );
}
