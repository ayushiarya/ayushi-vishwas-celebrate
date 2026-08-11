import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  /** revealed content underneath the foil */
  children: React.ReactNode;
  /** percentage of scratched area after which the card fully reveals */
  threshold?: number;
  topLine?: string;
  brand?: string;
};

function drawFoil(ctx: CanvasRenderingContext2D, w: number, h: number, brand: string) {
  // base wine foil with a soft sheen
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#7d2a35");
  g.addColorStop(0.45, "#93384184");
  g.addColorStop(0.5, "#b9636b");
  g.addColorStop(0.55, "#93384184");
  g.addColorStop(1, "#6d2430");
  ctx.fillStyle = "#77262f";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // doodle pattern: hearts, stars, tiny flowers
  ctx.strokeStyle = "rgba(238, 205, 168, 0.42)";
  ctx.fillStyle = "rgba(238, 205, 168, 0.34)";
  ctx.lineWidth = 1.2;
  const step = 62;
  let row = 0;
  for (let y = 30; y < h + step; y += step) {
    row += 1;
    for (let x = (row % 2 ? 30 : 60); x < w + step; x += step) {
      const kind = (row + Math.round(x / step)) % 3;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((((x + y) % 7) - 3) * 0.05);
      if (kind === 0) {
        // heart
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.bezierCurveTo(-8, -3, -4, -10, 0, -5);
        ctx.bezierCurveTo(4, -10, 8, -3, 0, 5);
        ctx.stroke();
      } else if (kind === 1) {
        // 4-point sparkle
        ctx.beginPath();
        ctx.moveTo(0, -7);
        ctx.quadraticCurveTo(1, -1, 7, 0);
        ctx.quadraticCurveTo(1, 1, 0, 7);
        ctx.quadraticCurveTo(-1, 1, -7, 0);
        ctx.quadraticCurveTo(-1, -1, 0, -7);
        ctx.fill();
      } else {
        // tiny flower
        for (let p = 0; p < 5; p++) {
          ctx.beginPath();
          ctx.ellipse(0, -5, 2.2, 4.2, (p * Math.PI * 2) / 5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.rotate((Math.PI * 2) / 5);
        }
      }
      ctx.restore();
    }
  }

  // brand line
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate(-0.06);
  ctx.fillStyle = "rgba(247, 232, 210, 0.9)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `italic ${Math.max(20, Math.min(34, w / 12))}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillText(brand, 0, -2);
  ctx.strokeStyle = "rgba(247, 232, 210, 0.55)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-w / 5, 22);
  ctx.lineTo(w / 5, 22);
  ctx.stroke();
  ctx.restore();

  // inner border
  ctx.strokeStyle = "rgba(247, 232, 210, 0.5)";
  ctx.lineWidth = 1;
  ctx.strokeRect(10, 10, w - 20, h - 20);
  ctx.strokeStyle = "rgba(247, 232, 210, 0.25)";
  ctx.strokeRect(16, 16, w - 32, h - 32);
}

export function ScratchCard({
  children,
  threshold = 45,
  topLine = "Something special is hiding here…",
  brand = "Ayushi ♥ Vishwas",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = wrap.getBoundingClientRect();
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    drawFoil(ctx, width, height, brand);
  }, [brand]);

  useEffect(() => {
    paint();
    const ro = new ResizeObserver(() => {
      if (!revealed) paint();
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [paint, revealed]);

  const progress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return 0;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    const stride = 16 * 4; // sample every 16th pixel
    let total = 0;
    for (let i = 3; i < data.length; i += stride) {
      total++;
      if (data[i]! < 40) clear++;
    }
    return total ? (clear / total) * 100 : 0;
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 46;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    const p = last.current ?? { x, y };
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 23, 0, Math.PI * 2);
    ctx.fill();
    last.current = { x, y };
  };

  const pos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onDown = (e: React.PointerEvent) => {
    if (revealed) return;
    drawing.current = true;
    setStarted(true);
    last.current = null;
    canvasRef.current?.setPointerCapture(e.pointerId);
    const { x, y } = pos(e);
    scratch(x, y);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!drawing.current || revealed) return;
    e.preventDefault();
    const { x, y } = pos(e);
    scratch(x, y);
  };

  const onUp = () => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    if (progress() > threshold) setRevealed(true);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        ref={wrapRef}
        className="scratch-card relative aspect-[16/9] w-full overflow-hidden select-none sm:aspect-[2/1]"
      >
        {/* revealed content */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-transform duration-700 ${
            revealed ? "scale-100" : "scale-[0.97]"
          }`}
        >
          {children}
        </div>

        {/* foil */}
        <canvas
          ref={canvasRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          onPointerCancel={onUp}
          className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-700 ${
            revealed ? "pointer-events-none opacity-0" : "cursor-grab opacity-100 active:cursor-grabbing"
          }`}
        />

        {!started && !revealed ? (
          <p className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-[0.6rem] tracking-[0.34em] text-[#f3e2cb] uppercase">
            {topLine}
          </p>
        ) : null}
      </div>

      <p className="mt-5 text-center font-display text-lg italic text-primary/75">
        {revealed ? "There it is — see you there ♥" : "Go on, scratch it ✨"}
      </p>
    </div>
  );
}
