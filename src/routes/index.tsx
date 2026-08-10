import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Envelope } from "@/components/Envelope";
import { Nav } from "@/components/Nav";
import { Petals } from "@/components/Petals";
import { Reveal } from "@/components/Reveal";
import { Countdown } from "@/components/Countdown";
import { Weather } from "@/components/Weather";
import {
  COUPLE,
  EVENTS,
  GOOD_TO_KNOW,
  HOTELS,
  STORY,
  calendarLink,
  mapsDirections,
  mapsEmbed,
  mapsView,
} from "@/lib/wedding";
import venueImg from "@/assets/venue.jpg";
import sprig from "@/assets/sprig.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ayushi & Vishwas · Wedding Invitation, Jamshedpur" },
      {
        name: "description",
        content:
          "Ayushi & Vishwas invite you to their wedding on the 24th & 25th at Hill View Resort, Jamshedpur — haldi, sangeet, engagement and the wedding ceremony.",
      },
      { property: "og:title", content: "Ayushi & Vishwas · Wedding Invitation, Jamshedpur" },
      {
        property: "og:description",
        content:
          "Ayushi & Vishwas invite you to their wedding on the 24th & 25th at Hill View Resort, Jamshedpur — haldi, sangeet, engagement and the wedding ceremony.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function SectionHeading({ eyebrow, title }: { eyebrow: string; title?: string }) {
  return (
    <Reveal className="text-center">
      <p className="eyebrow">{eyebrow}</p>
      {title ? (
        <h2 className="script mt-4 text-4xl text-primary sm:text-5xl">{title}</h2>
      ) : null}
      <span className="rule-gold mx-auto mt-6 block w-24" />
    </Reveal>
  );
}

function Ornament() {
  return (
    <img
      src={sprig}
      alt=""
      aria-hidden
      width={900}
      height={900}
      loading="lazy"
      className="mx-auto w-24 opacity-70"
    />
  );
}

function Invitation() {
  const [opened, setOpened] = useState(false);

  return (
    <div className={opened ? "" : "max-h-screen overflow-hidden"}>
      <Envelope onOpen={() => setOpened(true)} />
      <Nav />

      <main>
        {/* HERO */}
        <section
          id="home"
          className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-24"
        >
          <Petals count={16} opacity={0.45} />
          <div className="relative w-full max-w-2xl text-center">
            <Reveal delay={200}>
              <p className="eyebrow">Together with their families</p>
            </Reveal>
            <Reveal delay={400}>
              <h1 className="script mt-8 text-6xl leading-[0.95] text-primary sm:text-8xl">
                {COUPLE.bride}
                <span className="my-3 block font-display text-3xl text-gold sm:text-4xl">&</span>
                {COUPLE.groom}
              </h1>
            </Reveal>
            <Reveal delay={600}>
              <p className="mt-8 font-display text-xl italic text-muted-foreground">
                Two hearts. One beautiful beginning.
              </p>
            </Reveal>
            <Reveal delay={800} className="mt-12">
              <span className="rule-gold mx-auto block w-32" />
              <p className="script mt-6 text-3xl text-primary">24th & 25th</p>
              <p className="mt-3 text-[0.65rem] tracking-[0.34em] text-muted-foreground uppercase">
                {COUPLE.city}, {COUPLE.state}
              </p>
            </Reveal>
          </div>
        </section>

        {/* SAVE THE DATE */}
        <section id="save-the-date" className="px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <SectionHeading eyebrow="Save the date" title="24th & 25th" />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 sm:gap-10">
              {[
                {
                  day: "24",
                  suffix: "th",
                  items: ["Haldi — Morning", "Sangeet & Engagement — Evening"],
                },
                { day: "25", suffix: "th", items: ["Wedding — Evening"] },
              ].map((d, i) => (
                <Reveal key={d.day} delay={i * 150}>
                  <div className="ornament-frame paper flex h-full flex-col items-center px-6 py-12 text-center">
                    <span className="script text-7xl text-primary">
                      {d.day}
                      <sup className="font-display text-2xl text-gold">{d.suffix}</sup>
                    </span>
                    <span className="rule-gold my-7 w-16" />
                    <ul className="space-y-3">
                      {d.items.map((it) => (
                        <li
                          key={it}
                          className="text-[0.7rem] tracking-[0.24em] text-muted-foreground uppercase"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="relative overflow-hidden px-5 py-24 sm:py-32">
          <Petals count={8} opacity={0.3} />
          <div className="relative mx-auto max-w-4xl">
            <SectionHeading eyebrow="The countdown begins" />
            <div className="mt-14">
              <Reveal>
                <Countdown />
              </Reveal>
            </div>
            <Reveal delay={200}>
              <p className="mt-10 text-center text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
                25th Evening · Wedding Ceremony · {COUPLE.venue}, {COUPLE.city}
              </p>
            </Reveal>
          </div>
        </section>

        {/* OUR STORY */}
        <section id="story" className="px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="Our story" />
            <ol className="mt-14 space-y-10 border-l border-border pl-8 sm:pl-12">
              {STORY.map((s, i) => (
                <Reveal as="li" key={s.label} delay={i * 100} className="relative">
                  <span className="absolute -left-[38px] top-2 h-2 w-2 rotate-45 bg-gold sm:-left-[54px]" />
                  <h3 className="font-display text-2xl text-primary">{s.label}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* EVENTS */}
        <section id="events" className="px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="The wedding celebrations" />
            <div className="mt-14 grid gap-8 lg:grid-cols-3">
              {EVENTS.map((e, i) => (
                <Reveal as="article" key={e.id} delay={i * 140}>
                  <div className="ornament-frame paper group flex h-full flex-col px-7 py-10 transition-transform duration-700 hover:-translate-y-1.5">
                    <Ornament />
                    <h3 className="script mt-6 text-center text-3xl text-primary">{e.name}</h3>
                    <p className="mt-3 text-center text-[0.62rem] tracking-[0.3em] text-muted-foreground uppercase">
                      {e.day}
                      {e.daySuffix} · {e.partOfDay}
                    </p>
                    <span className="rule-gold my-6 w-full" />
                    <p className="text-center text-sm leading-relaxed text-muted-foreground">
                      {e.description}
                    </p>

                    <dl className="mt-7 space-y-3 text-center">
                      <div>
                        <dt className="text-[0.55rem] tracking-[0.3em] text-muted-foreground uppercase">
                          Time
                        </dt>
                        <dd className="font-display text-lg text-primary">{e.time}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.55rem] tracking-[0.3em] text-muted-foreground uppercase">
                          Venue
                        </dt>
                        <dd className="font-display text-lg text-primary">
                          {COUPLE.venue}, {COUPLE.city}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[0.55rem] tracking-[0.3em] text-muted-foreground uppercase">
                          Dress code
                        </dt>
                        <dd className="font-display text-lg text-primary">{e.dressCode}</dd>
                      </div>
                    </dl>

                    <div className="mt-auto flex flex-wrap justify-center gap-3 pt-8">
                      <a
                        href={calendarLink(e)}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-primary/40 px-4 py-2 text-[0.58rem] tracking-[0.24em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        Add to calendar
                      </a>
                      <a
                        href={mapsDirections}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-border px-4 py-2 text-[0.58rem] tracking-[0.24em] text-muted-foreground uppercase transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        Directions
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* VENUE */}
        <section id="venue" className="px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="The venue" title={COUPLE.venue} />
            <Reveal delay={150} className="mt-12">
              <div className="overflow-hidden">
                <img
                  src={venueImg}
                  alt="Hill View Resort in Jamshedpur set for an evening wedding ceremony"
                  width={1600}
                  height={1008}
                  loading="lazy"
                  className="h-[46vh] w-full object-cover transition-transform duration-[2000ms] hover:scale-[1.04] sm:h-[62vh]"
                />
              </div>
            </Reveal>

            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              <Reveal>
                <p className="text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
                  {COUPLE.city}, {COUPLE.state}
                </p>
                <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
                  Set on a quiet ridge above the city, Hill View Resort looks out over terraced
                  lawns and the soft blue outline of the Dalma hills. Open courtyards, old trees
                  and long evenings of lantern light make it the kind of place a wedding is
                  remembered by.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={mapsView}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-primary/40 px-6 py-3 text-[0.6rem] tracking-[0.28em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    View on map
                  </a>
                  <a
                    href={mapsDirections}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-border px-6 py-3 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    Get directions
                  </a>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div className="ornament-frame overflow-hidden p-1.5">
                  <iframe
                    title="Map of Hill View Resort, Jamshedpur"
                    src={mapsEmbed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-72 w-full sm:h-80"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WEATHER */}
        <section className="px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <SectionHeading eyebrow="The wedding weather" title="Jamshedpur" />
            <div className="mt-14">
              <Reveal>
                <Weather />
              </Reveal>
            </div>
          </div>
        </section>

        {/* TRAVEL & STAY */}
        <section id="travel" className="px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="Travel & stay" />

            <Reveal className="mt-16">
              <h3 className="script text-3xl text-primary">Getting to Jamshedpur</h3>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  t: "Nearest airport",
                  d: "Sonari Airport (limited flights) · Ranchi (IXR) is the main gateway, 130 km away.",
                },
                {
                  t: "Nearest railway station",
                  d: "Tatanagar Junction (TATA) — well connected to Kolkata, Delhi, Mumbai and Ranchi.",
                },
                {
                  t: "Distance to venue",
                  d: "Approximately 12 km from Tatanagar Junction to Hill View Resort.",
                },
                {
                  t: "Travel time",
                  d: "25–35 minutes from the station · about 3 hours by road from Ranchi airport.",
                },
                {
                  t: "Recommended options",
                  d: "Pre-booked cabs from Ranchi, or the Steel Express / Howrah trains into Tatanagar.",
                },
                {
                  t: "Directions",
                  d: "Open live Google Maps directions to the resort gate.",
                  link: mapsDirections,
                },
              ].map((c, i) => (
                <Reveal key={c.t} delay={i * 80}>
                  <div className="paper h-full border-t border-gold/50 px-6 py-8">
                    <h4 className="text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                      {c.t}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80">{c.d}</p>
                    {c.link ? (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-block text-[0.58rem] tracking-[0.24em] text-primary uppercase underline underline-offset-4"
                      >
                        Open in maps
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-20">
              <h3 className="script text-3xl text-primary">Stay</h3>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {HOTELS.map((h, i) => (
                <Reveal key={h.name} delay={i * 90}>
                  <div className="ornament-frame paper flex h-full flex-col px-6 py-8 text-center">
                    <h4 className="font-display text-2xl text-primary">{h.name}</h4>
                    <span className="rule-gold my-4 w-full" />
                    <p className="text-[0.58rem] tracking-[0.26em] text-muted-foreground uppercase">
                      {h.category}
                    </p>
                    <p className="mt-2 text-sm text-foreground/75">{h.distance}</p>
                    <a
                      href={h.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto pt-6 text-[0.58rem] tracking-[0.24em] text-primary uppercase underline underline-offset-4"
                    >
                      Book / contact
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-20">
              <h3 className="script text-3xl text-primary">Getting around</h3>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                {
                  t: "Cabs & taxis",
                  d: "Ola and Uber run through the city; the family desk can arrange pre-booked cabs for both days.",
                },
                {
                  t: "Local transport",
                  d: "Autos are plentiful and inexpensive within Bistupur, Sakchi and Kadma.",
                },
                {
                  t: "Travel tips",
                  d: "November evenings are cool — carry a light shawl. Keep some cash handy for autos.",
                },
              ].map((c, i) => (
                <Reveal key={c.t} delay={i * 90}>
                  <div className="paper h-full border-t border-gold/50 px-6 py-8">
                    <h4 className="text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                      {c.t}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80">{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* GOOD TO KNOW */}
        <section className="px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <SectionHeading eyebrow="Good to know" />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GOOD_TO_KNOW.map((c, i) => (
                <Reveal key={c.title} delay={i * 90}>
                  <div className="paper h-full px-6 py-8">
                    <h3 className="font-display text-2xl text-primary">{c.title}</h3>
                    <span className="rule-gold my-4 block w-12" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL */}
        <section className="relative flex min-h-[90svh] items-center justify-center overflow-hidden px-5 py-24">
          <Petals count={18} opacity={0.55} />
          <div className="relative w-full max-w-xl text-center">
            <Reveal>
              <p className="eyebrow">And so, our next chapter begins…</p>
            </Reveal>
            <Reveal delay={200}>
              <div className="ornament-frame paper mt-10 px-6 py-14">
                <h2 className="script text-5xl text-primary sm:text-6xl">
                  {COUPLE.bride} & {COUPLE.groom}
                </h2>
                <span className="rule-gold mx-auto my-7 block w-24" />
                <p className="text-[0.65rem] tracking-[0.32em] text-muted-foreground uppercase">
                  24th & 25th · {COUPLE.city}
                </p>
                <p className="mt-8 font-display text-xl italic text-primary/80">
                  We can&apos;t wait to celebrate with you.
                </p>
                <div
                  className="mx-auto mt-10 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 32% 30%, oklch(0.45 0.12 20), oklch(0.3 0.1 18))",
                  }}
                >
                  <span className="script text-base text-primary-foreground">A&V</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
