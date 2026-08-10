import { useEffect, useState } from "react";
import pattern from "@/assets/pattern.jpg";
import { COUPLE } from "@/lib/wedding";

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
      className={`fixed inset-0 z-50 flex items-center justify-center px-6 transition-opacity duration-1000 ${
        opening ? "pointer-events-none opacity-0 delay-[1400ms]" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(circle at 50% 35%, oklch(0.97 0.015 80), oklch(0.9 0.03 45))",
      }}
    >
      <div className="w-full max-w-lg text-center">
        <p className="eyebrow mb-8 block">An invitation awaits</p>

        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open the invitation"
          className="group relative mx-auto block w-full max-w-[420px] cursor-pointer"
          style={{ perspective: "1400px" }}
        >
          {/* envelope body */}
          <div
            className="relative aspect-[3/2] w-full overflow-hidden shadow-[0_40px_80px_-40px_oklch(0.34_0.098_18_/_0.5)]"
            style={{ backgroundColor: "oklch(0.955 0.017 80)" }}
          >
            <div
              className="absolute inset-0 opacity-[0.13] mix-blend-multiply"
              style={{ backgroundImage: `url(${pattern})`, backgroundSize: "260px" }}
            />

            {/* letter sliding out */}
            <div
              className={`absolute inset-x-6 bottom-6 top-8 paper flex flex-col items-center justify-center gap-3 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                opening ? "-translate-y-24 delay-500" : "translate-y-6"
              }`}
            >
              <span className="eyebrow">Together with their families</span>
              <span className="script text-4xl text-primary sm:text-5xl">
                {COUPLE.bride} & {COUPLE.groom}
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
                  "linear-gradient(160deg, oklch(0.95 0.02 70), oklch(0.91 0.03 45))",
                clipPath: "polygon(0 12%, 50% 62%, 100% 12%, 100% 100%, 0 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-20 mix-blend-multiply"
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
                  "linear-gradient(180deg, oklch(0.93 0.028 55), oklch(0.88 0.04 40))",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                zIndex: opening ? 1 : 3,
              }}
            >
              <div
                className="absolute inset-0 opacity-25 mix-blend-multiply"
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
                opening ? "scale-75 opacity-0" : "group-hover:scale-105"
              }`}
              style={{
                background:
                  "radial-gradient(circle at 32% 30%, oklch(0.45 0.12 20), oklch(0.3 0.1 18))",
                boxShadow: "0 8px 20px -8px oklch(0.3 0.1 18 / 0.8)",
              }}
            >
              <span className="script text-lg text-primary-foreground">A&V</span>
            </div>
          </div>
        </button>

        <p
          className={`mt-8 text-[0.7rem] tracking-[0.34em] text-muted-foreground uppercase transition-opacity duration-500 ${
            opening ? "opacity-0" : "opacity-100"
          }`}
        >
          Tap the seal to open
        </p>
      </div>
    </div>
  );
}
