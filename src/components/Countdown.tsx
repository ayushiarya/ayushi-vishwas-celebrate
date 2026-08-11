import { useEffect, useState } from "react";
import { WEDDING_DATE } from "@/lib/wedding";
import { HeartDoodle, MarigoldDoodle, SparkleDoodle, StarDoodle } from "@/components/Doodles";


function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

export function Countdown() {
  const target = new Date(WEDDING_DATE).getTime();
  const [t, setT] = useState(() => diff(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = window.setInterval(() => setT(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  const decor = [
    <HeartDoodle key="h" className="w-4 text-rose" />,
    <MarigoldDoodle key="m" className="w-5 text-mustard" />,
    <StarDoodle key="s" className="w-4 text-sage" />,
    <SparkleDoodle key="sp" className="w-4 text-gold" />,
  ];
  const tilts = ["-rotate-1", "rotate-1", "-rotate-[0.6deg]", "rotate-[0.8deg]"];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {units.map((u, i) => (
        <div
          key={u.label}
          className={`stationery-tile px-3 py-7 text-center ${tilts[i]}`}
        >
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-card px-2 twinkle">
            {decor[i]}
          </span>
          <div className="script text-4xl text-primary tabular-nums sm:text-5xl">
            {mounted ? String(u.value).padStart(2, "0") : "--"}
          </div>
          <div className="mt-3 text-[0.6rem] tracking-[0.34em] text-muted-foreground uppercase">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

