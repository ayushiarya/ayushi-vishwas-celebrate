import { useEffect, useState } from "react";
import { COUPLE, WEDDING_DATE } from "@/lib/wedding";

type Forecast = {
  max: number;
  min: number;
  code: number;
  morning: number;
  evening: number;
  rainLabel: string;
  rainValue: string;
};

type Source = "forecast" | "typical";

const CONDITIONS: Record<number, string> = {
  0: "Clear skies",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Misty",
  48: "Misty",
  51: "Light drizzle",
  61: "Light rain",
  63: "Rain",
  80: "Passing showers",
  95: "Thundery showers",
};

function Sun() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" aria-hidden>
      <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <line
            key={i}
            x1={+(32 + Math.cos(a) * 18).toFixed(2)}
            y1={+(32 + Math.sin(a) * 18).toFixed(2)}
            x2={+(32 + Math.cos(a) * 24).toFixed(2)}
            y2={+(32 + Math.sin(a) * 24).toFixed(2)}
            stroke="currentColor"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

export function Weather() {
  const [data, setData] = useState<Forecast | null>(null);
  const [source, setSource] = useState<Source | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const day = WEDDING_DATE.slice(0, 10); // 2026-11-25
    const monthDay = day.slice(5); // 11-25
    const { lat, lon } = COUPLE.coords;
    const base = `latitude=${lat}&longitude=${lon}&timezone=Asia%2FKolkata&hourly=temperature_2m`;

    const valid = (j: any) =>
      j && j.daily && Array.isArray(j.daily.temperature_2m_max) &&
      typeof j.daily.temperature_2m_max[0] === "number";

    const parse = (j: any, probability: boolean): Forecast => {
      const hours: number[] = j.hourly?.temperature_2m ?? [];
      const d = j.daily;
      const max = Math.round(d.temperature_2m_max[0]);
      const min = Math.round(d.temperature_2m_min[0]);
      return {
        max,
        min,
        code: d.weather_code?.[0] ?? 0,
        morning: Math.round(hours[9] ?? max),
        evening: Math.round(hours[19] ?? min),
        rainLabel: probability ? "Rain chance" : "Rainfall",
        rainValue: probability
          ? `${d.precipitation_probability_max?.[0] ?? 0}%`
          : `${Math.round(d.precipitation_sum?.[0] ?? 0)} mm`,
      };
    };

    const forecastUrl =
      `https://api.open-meteo.com/v1/forecast?${base}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code` +
      `&start_date=${day}&end_date=${day}`;

    const archiveUrl = (d: string) =>
      `https://archive-api.open-meteo.com/v1/archive?${base}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code` +
      `&start_date=${d}&end_date=${d}`;

    let cancelled = false;

    const run = async () => {
      // 1) Live forecast — succeeds once the wedding is within the API's ~16-day window.
      try {
        const r = await fetch(forecastUrl);
        if (r.ok) {
          const j = await r.json();
          if (valid(j)) {
            if (!cancelled) {
              setData(parse(j, true));
              setSource("forecast");
            }
            return;
          }
        }
      } catch {
        /* fall through to typical weather */
      }

      // 2) Typical weather — same date from the most recent available past year.
      const now = Date.now();
      let y = Number(day.slice(0, 4));
      while (new Date(`${y}-${monthDay}T00:00:00`).getTime() > now - 7 * 864e5) y -= 1;
      for (const yr of [y, y - 1]) {
        try {
          const r = await fetch(archiveUrl(`${yr}-${monthDay}`));
          if (!r.ok) continue;
          const j = await r.json();
          if (valid(j)) {
            if (!cancelled) {
              setData(parse(j, false));
              setSource("typical");
            }
            return;
          }
        } catch {
          /* try the previous year */
        }
      }

      if (!cancelled) setFailed(true);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = [
    { label: "Condition", value: data ? (CONDITIONS[data.code] ?? "Fair") : "—" },
    { label: data?.rainLabel ?? "Rain chance", value: data?.rainValue ?? "—" },
    { label: "Morning", value: data ? `${data.morning}°C` : "—" },
    { label: "Evening", value: data ? `${data.evening}°C` : "—" },
  ];

  const caption = source === "typical" ? "Typical late-November weather" : data ? `Low ${data.min}°C` : "Loading";

  return (
    <div className="paper ornament-frame mx-auto max-w-3xl px-6 py-10 sm:px-12">
      <div className="grid gap-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-12">
        <div className="flex flex-col items-center gap-3 text-gold">
          <span className="float-slow">
            <Sun />
          </span>
          <span className="script text-5xl text-primary">
            {data ? `${data.max}°` : failed ? "—" : "··"}
          </span>
          <span className="text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
            {caption}
          </span>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
          {rows.map((r) => (
            <div key={r.label}>
              <dt className="text-[0.58rem] tracking-[0.3em] text-muted-foreground uppercase">
                {r.label}
              </dt>
              <dd className="mt-1 font-display text-2xl text-primary">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-10 text-center font-display text-xl italic text-primary/80">
        {failed
          ? "Forecast arrives closer to the day. Expect gentle winter sun."
          : source === "typical"
            ? "Based on recent late-November weather in Jamshedpur. A live forecast arrives closer to the day."
            : "A little sunshine, a little celebration, and a lot of love."}
      </p>
    </div>
  );
}
