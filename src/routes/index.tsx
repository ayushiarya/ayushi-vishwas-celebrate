import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Envelope } from "@/components/Envelope";
import { Nav } from "@/components/Nav";
import { Petals } from "@/components/Petals";
import { Reveal } from "@/components/Reveal";
import { Countdown } from "@/components/Countdown";
import { Weather } from "@/components/Weather";

import {
  BowDoodle,
  DoodleDivider,
  HeartDoodle,
  LeafSprigDoodle,
  MarigoldDoodle,
  SparkleDoodle,
  SquiggleDoodle,
  StarDoodle,
} from "@/components/Doodles";
import {
  HaldiCaricature,
  SangeetCaricature,
  WeddingCaricature,
} from "@/components/EventCaricatures";
import {
  COUPLE,
  EVENTS,
  FOOD_SPOTS,
  PLACES_TO_VISIT,
  calendarLink,
  mapsDirections,
  mapsEmbed,
  mapsView,
} from "@/lib/wedding";

import venueImg from "@/assets/venue.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ayushi & Vishwas · Wedding Invitation, Jamshedpur" },
      {
        name: "description",
        content:
          "Ayushi & Vishwas invite you to their wedding on the 24th & 25th November at Hill View Resort, Jamshedpur — haldi, sangeet, engagement and the wedding ceremony.",
      },
      { property: "og:title", content: "Ayushi & Vishwas · Wedding Invitation, Jamshedpur" },
      {
        property: "og:description",
        content:
          "Ayushi & Vishwas invite you to their wedding on the 24th & 25th November at Hill View Resort, Jamshedpur — haldi, sangeet, engagement and the wedding ceremony.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function SectionHeading({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title?: string;
  note?: string;
}) {
  return (
    <Reveal className="text-center">
      <p className="eyebrow">{eyebrow}</p>
      {title ? (
        <h2 className="poster-title mt-4 text-4xl text-primary sm:text-6xl">{title}</h2>
      ) : null}
      {note ? <p className="hand mt-3 text-2xl text-rose">{note}</p> : null}
      <DoodleDivider className="mt-5" />
    </Reveal>
  );
}


function Invitation() {
  const [opened, setOpened] = useState(false);

  const caricatures = [HaldiCaricature, SangeetCaricature, WeddingCaricature];
  const eventTints = ["wash-sage", "wash-blush", "wash-lavender"];

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
          <div className="wash-blush pointer-events-none absolute inset-0 opacity-70" />

          {/* floating doodles */}
          <MarigoldDoodle className="absolute left-[6%] top-[18%] w-12 text-mustard/70 float-slow sm:w-16" />
          <LeafSprigDoodle className="absolute right-[5%] top-[24%] w-24 text-sage/70 wiggle-slow sm:w-32" />
          <HeartDoodle className="absolute bottom-[18%] left-[12%] w-7 text-rose/70 twinkle" />
          <SparkleDoodle className="absolute right-[14%] bottom-[22%] w-8 text-gold/80 twinkle" />
          <StarDoodle className="absolute left-[42%] top-[12%] w-5 text-lavender twinkle" />

          <div className="relative w-full max-w-2xl text-center">
            <Reveal delay={200}>
              <p className="eyebrow">Together with their families</p>
            </Reveal>

            <Reveal delay={400}>
              <div className="relative mt-8">
                <BowDoodle className="absolute -top-8 left-1/2 w-12 -translate-x-1/2 text-rose/70 wiggle-slow" />
                <h1 className="script text-6xl leading-[0.95] text-primary sm:text-8xl">
                  <span className="relative inline-block">
                    {COUPLE.bride}
                    <SparkleDoodle className="absolute -right-7 -top-3 w-6 text-gold twinkle" />
                  </span>
                  <span className="my-4 flex items-center justify-center gap-3">
                    <SquiggleDoodle className="w-14 text-antique-gold/60" />
                    <span className="font-display text-3xl text-gold sm:text-4xl">&</span>
                    <SquiggleDoodle className="w-14 -scale-x-100 text-antique-gold/60" />
                  </span>
                  <span className="relative inline-block">
                    {COUPLE.groom}
                    <HeartDoodle className="absolute -left-8 -bottom-1 w-6 text-rose twinkle" />
                  </span>
                </h1>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <p className="mt-8 font-display text-xl italic text-muted-foreground">
                Two hearts. One beautiful beginning.
              </p>
            </Reveal>

            <Reveal delay={800} className="mt-10">
              <DoodleDivider />
              <p className="mt-5 text-[0.65rem] tracking-[0.34em] text-muted-foreground uppercase">
                {COUPLE.city}, {COUPLE.state}
              </p>
            </Reveal>
          </div>
        </section>

        <FilmiMarquee
          items={[
            "Dhol bajne wala hai",
            "Bring your dancing shoes",
            "Extra jalebi guaranteed",
            "Aunties on standby",
            "Two days of pure filmi",
          ]}
        />



        {/* SAVE THE DATE */}
        <section id="save-the-date" className="relative overflow-hidden px-5 py-24 sm:py-32">
          <div className="wash-sage pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="Save the date"
              title="Date Note Kar Lijiye"
              note="no excuses, we checked your calendar"
            />

            <Reveal delay={120} className="mt-12">
              <div className="filmi-banner relative mx-auto max-w-2xl px-6 py-12 text-center">
                <MarigoldDoodle className="absolute -left-4 -top-5 w-12 text-mustard float-slow" />
                <MarigoldDoodle className="absolute -right-4 -bottom-5 w-12 text-mustard float-slow" />
                <p className="eyebrow">Mark your calendars</p>
                <p className="script mt-3 text-5xl leading-[1.05] text-primary sm:text-7xl">
                  24<sup className="font-display text-2xl text-gold">th</sup> &amp; 25
                  <sup className="font-display text-2xl text-gold">th</sup>
                  <span className="mt-1 block">November</span>
                </p>
                <div className="mt-4 flex items-center justify-center gap-3 text-rose">
                  <HeartDoodle className="w-4" />
                  <span className="text-[0.6rem] tracking-[0.32em] text-muted-foreground uppercase">
                    {COUPLE.venue}, {COUPLE.city}
                  </span>
                  <HeartDoodle className="w-4" />
                </div>
              </div>
            </Reveal>


            <div className="mt-14 grid gap-6 sm:grid-cols-2 sm:gap-10">
              {[
                {
                  day: "24",
                  suffix: "th",
                  items: ["Haldi — Morning", "Sangeet & Engagement — Evening"],
                  tilt: "-rotate-1",
                },
                { day: "25", suffix: "th", items: ["Wedding — Evening"], tilt: "rotate-1" },
              ].map((d, i) => (
                <Reveal key={d.day} delay={i * 150}>
                  <div
                    className={`card-organic ${i === 1 ? "card-organic-alt" : ""} ${d.tilt} relative flex h-full flex-col items-center px-6 py-12 text-center`}
                  >
                    <MarigoldDoodle className="absolute -left-3 -top-4 w-10 text-mustard/80 doodle-hover" />
                    <span className="script text-7xl text-primary">
                      {d.day}
                      <sup className="font-display text-2xl text-gold">{d.suffix}</sup>
                    </span>
                    <SquiggleDoodle className="my-6 w-20 text-antique-gold/70" />
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
            <SectionHeading
              eyebrow="The countdown begins"
              title="Shaadi Loading…"
              note="the aunties are already packing"
            />

            <div className="mt-14">
              <Reveal>
                <Countdown />
              </Reveal>
            </div>
            <Reveal delay={200}>
              <p className="mt-10 text-center font-display text-xl italic text-primary/80">
                25th November · Evening · Wedding Ceremony
              </p>
              <p className="mt-2 text-center text-[0.62rem] tracking-[0.3em] text-muted-foreground uppercase">
                {COUPLE.venue}, {COUPLE.city}
              </p>
            </Reveal>
          </div>
        </section>



        {/* EVENTS */}
        <section id="events" className="relative overflow-hidden px-5 py-24 sm:py-32">
          <div className="relative mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="The wedding celebrations"
              title="Teen Din, Teen Kahaniyan"
              note="haldi, disco sangeet, and the big one"
            />

            <div className="mt-24 grid gap-16 lg:grid-cols-3 lg:gap-8">
              {EVENTS.map((e, i) => {
                const Caricature = caricatures[i]!;
                return (
                  <Reveal as="article" key={e.id} delay={i * 140}>
                    <div
                      className={`card-organic ${i % 2 ? "card-organic-alt rotate-[0.7deg]" : "-rotate-[0.7deg]"} relative flex h-full flex-col px-7 pb-10 pt-20`}
                    >
                      <div className={`${eventTints[i]} pointer-events-none absolute inset-0 rounded-[inherit] opacity-60`} />

                      {/* caricature spilling over the card edge */}
                      <div className="absolute -top-28 left-1/2 -translate-x-1/2">
                        <div className="float-slow">
                          <Caricature />
                        </div>
                      </div>

                      <SparkleDoodle className="absolute right-4 top-6 w-5 text-gold twinkle" />
                      <StarDoodle className="absolute left-5 top-10 w-4 text-sage twinkle" />

                      <div className="relative">
                        <p className="text-center text-[0.6rem] tracking-[0.34em] text-muted-foreground uppercase">
                          {e.day}
                          {e.daySuffix} · {e.partOfDay}
                        </p>
                        <h3 className="script mt-2 text-center text-3xl text-primary">{e.name}</h3>
                        <DoodleDivider className="mt-4" />
                        <p className="mt-5 text-center text-sm leading-relaxed text-muted-foreground">
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
                          <a href={calendarLink(e)} target="_blank" rel="noreferrer" className="btn-ink">
                            Add to calendar
                          </a>
                          <a href={mapsDirections} target="_blank" rel="noreferrer" className="btn-quiet">
                            Directions
                          </a>
                        </div>
                      </div>

                      <LeafSprigDoodle className="absolute -bottom-4 -right-3 w-20 text-sage/70 doodle-hover" />
                    </div>
                  </Reveal>
                );
              })}
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
                    className="btn-ink"
                  >
                    View on map
                  </a>
                  <a
                    href={mapsDirections}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-quiet"
                  >
                    Get directions
                  </a>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div className="card-organic overflow-hidden p-1.5">
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
            <SectionHeading
              eyebrow="Travel & stay"
              title="Pahunche Kaise?"
              note="trains, cabs, and one very scenic drive"
            />


            <Reveal className="mt-16">
              <h3 className="script text-3xl text-primary">Getting to Jamshedpur</h3>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  t: "Nearest airport",
                  d: "Birsa Munda Airport, Ranchi (IXR) — 130 km away, about 3 hours by road.",
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
                  <div className="card-organic h-full px-6 py-8">
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
                  <div className="card-organic h-full px-6 py-8">
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

        {/* WHILE YOU'RE HERE */}
        <section id="while-here" className="relative overflow-hidden px-5 py-24 sm:py-32">
          <div className="wash-lavender pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative mx-auto max-w-6xl">
            <SectionHeading eyebrow="While you're here" title="Jamshedpur, our way" />

            <Reveal className="mt-16">
              <h3 className="script text-3xl text-primary">Places to see</h3>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PLACES_TO_VISIT.map((p, i) => (
                <Reveal key={p.name} delay={i * 70}>
                  <div
                    className={`card-organic ${i % 2 ? "card-organic-alt rotate-[0.6deg]" : "-rotate-[0.6deg]"} relative h-full px-6 py-8`}
                  >
                    <MarigoldDoodle className="absolute -right-3 -top-4 w-9 text-mustard/80 doodle-hover" />
                    <p className="text-[0.55rem] tracking-[0.3em] text-rose uppercase">{p.tag}</p>
                    <h4 className="mt-2 font-display text-2xl text-primary">{p.name}</h4>
                    <SquiggleDoodle className="my-4 w-16 text-antique-gold/70" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-block text-[0.58rem] tracking-[0.24em] text-primary uppercase underline underline-offset-4"
                    >
                      Open in maps
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-20">
              <h3 className="script text-3xl text-primary">Must-eat, must-try</h3>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FOOD_SPOTS.map((f, i) => (
                <Reveal key={f.name} delay={i * 70}>
                  <div
                    className={`card-organic ${i % 2 ? "-rotate-[0.6deg]" : "card-organic-alt rotate-[0.6deg]"} relative h-full px-6 py-8`}
                  >
                    <HeartDoodle className="absolute -left-3 -top-4 w-7 text-rose twinkle" />
                    <p className="text-[0.55rem] tracking-[0.3em] text-sage uppercase">{f.tag}</p>
                    <h4 className="mt-2 font-display text-2xl text-primary">{f.name}</h4>
                    <SquiggleDoodle className="my-4 w-16 text-rose/70" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                    <a
                      href={f.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-block text-[0.58rem] tracking-[0.24em] text-primary uppercase underline underline-offset-4"
                    >
                      Open in maps
                    </a>
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
              <div className="card-organic relative mt-10 px-6 py-14">
                <h2 className="script text-5xl text-primary sm:text-6xl">
                  {COUPLE.bride} & {COUPLE.groom}
                </h2>
                <DoodleDivider className="my-7" />
                <p className="text-[0.65rem] tracking-[0.32em] text-muted-foreground uppercase">
                  24th & 25th November · {COUPLE.city}
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
