import { useEffect, useState } from "react";
import { COUPLE, WEDDING_DATE } from "@/lib/wedding";

type Forecast = {
  max: number;
  min: number;
  rain: number;
  code: number;
  morning: number;
  evening: number;
};

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
            x1={32 + Math.cos(a) * 18}
            y1={32 + Math.sin(a) * 18}
            x2={32 + Math.cos(a) * 24}
            y2={32 + Math.sin(a) * 24}
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
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const day = WEDDING_DATE.slice(0, 10);
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${COUPLE.coords.lat}` +
      `&longitude=${COUPLE.coords.lon}&daily=temperature_2m_max,temperature_2m_min,` +
      `precipitation_probability_max,weather_code&hourly=temperature_2m&timezone=Asia%2FKolkata` +
      `&start_date=${day}&end_date=${day}`;

    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("weather"))))
      .then((j) => {
        const hours: number[] = j.hourly?.temperature_2m ?? [];
        setData({
          max: Math.round(j.daily.temperature_2m_max[0]),
          min: Math.round(j.daily.temperature_2m_min[0]),
          rain: j.daily.precipitation_probability_max?.[0] ?? 0,
          code: j.daily.weather_code?.[0] ?? 0,
          morning: Math.round(hours[9] ?? j.daily.temperature_2m_max[0]),
          evening: Math.round(hours[19] ?? j.daily.temperature_2m_min[0]),
        });
      })
      .catch(() => setFailed(true));
  }, []);

  const rows = [
    { label: "Condition", value: data ? (CONDITIONS[data.code] ?? "Fair") : "—" },
    { label: "Rain chance", value: data ? `${data.rain}%` : "—" },
    { label: "Morning", value: data ? `${data.morning}°C` : "—" },
    { label: "Evening", value: data ? `${data.evening}°C` : "—" },
  ];

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
            {data ? `Low ${data.min}°C` : "Loading"}
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
          ? "Forecast arrives closer to the day — expect gentle winter sun."
          : "A little sunshine, a little celebration, and a lot of love."}
      </p>
    </div>
  );
}
