import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  coverLabel?: string;
};

/** Canvas scratch-to-reveal card. Falls back to revealed content if canvas is unavailable. */
export function ScratchCard({ children, className = "", coverLabel = "Scratch here" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const paint = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, "#b9812f");
      grad.addColorStop(0.35, "#e0b25c");
      grad.addColorStop(0.6, "#8e2733");
      grad.addColorStop(1, "#c2913c");
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // sprinkled foil dots
      ctx.fillStyle = "rgba(255,255,255,0.16)";
      for (let i = 0; i < 220; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "rgba(255,248,231,0.92)";
      ctx.font = "600 13px Jost, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.letterSpacing = "6px";
      ctx.fillText(coverLabel.toUpperCase(), rect.width / 2, rect.height / 2 + 4);
    };

    paint();
    const ro = new ResizeObserver(() => {
      if (!revealed) paint();
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [coverLabel, revealed]);

  function scratch(clientX: number, clientY: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 30, 0, Math.PI * 2);
    ctx.fill();
  }

  function checkProgress() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 40) {
      if (data[i] === 0) clear++;
    }
    if (clear / (data.length / 40) > 0.42) setRevealed(true);
  }

  return (
    <div ref={wrapRef} className={`relative select-none ${className}`}>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 h-full w-full cursor-grab rounded-[inherit] touch-none transition-opacity duration-700 ${
          revealed ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        onPointerDown={(e) => {
          drawing.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          scratch(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          scratch(e.clientX, e.clientY);
        }}
        onPointerUp={() => {
          drawing.current = false;
          checkProgress();
        }}
        onPointerLeave={() => {
          if (drawing.current) {
            drawing.current = false;
            checkProgress();
          }
        }}
      />
      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="absolute -bottom-9 left-1/2 -translate-x-1/2 hand text-base underline underline-offset-4"
        >
          can&apos;t be bothered? tap to reveal
        </button>
      ) : null}
    </div>
  );
}
