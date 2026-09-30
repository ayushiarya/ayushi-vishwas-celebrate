import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { HeartDoodle, MarigoldDoodle } from "@/components/Doodles";

const field =
  "mt-2 w-full rounded-xl border border-dashed border-primary/30 bg-card/70 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary";
const label = "block text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase";

const rsvpSchema = z
  .object({
    name: z.string().trim().min(1, "Please add your name").max(100),
    plusOne: z.boolean(),
    plusOneName: z.string().trim().max(100),
    phone: z
      .string()
      .trim()
      .regex(/^[+0-9 ()-]{5,20}$/, "Please add a valid contact number"),
    email: z.string().trim().email("Please add a valid email").max(255),
  })
  .refine((d) => !d.plusOne || d.plusOneName.length > 0, {
    message: "Please add your +1's name",
    path: ["plusOneName"],
  });

export function RsvpForm() {
  const [v, setV] = useState({ name: "", plusOne: false, plusOneName: "", phone: "", email: "" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = rsvpSchema.safeParse(v);
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Please check the form");
    setError(null);
    setBusy(true);
    const d = parsed.data;
    const { error: err } = await supabase.from("rsvps").insert({
      name: d.name,
      bringing_plus_one: d.plusOne,
      plus_one_name: d.plusOne ? d.plusOneName : null,
      phone: d.phone,
      email: d.email,
    });
    setBusy(false);
    if (err) return setError("Something went wrong — please try again.");
    setDone(true);
  }

  if (done)
    return (
      <div className="card-organic relative px-6 py-14 text-center">
        <p className="script text-4xl text-primary">Yay! We’ve saved your RSVP ❤️</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="card-organic relative space-y-6 px-6 py-10 sm:px-10">
      <MarigoldDoodle className="absolute -right-3 -top-4 w-10 text-mustard/80 doodle-hover" />
      <label className={label}>
        Name
        <input className={field} value={v.name} maxLength={100} onChange={(e) => setV({ ...v, name: e.target.value })} />
      </label>
      <fieldset>
        <legend className={label}>Bringing a +1?</legend>
        <div className="mt-3 flex gap-3">
          {[true, false].map((opt) => (
            <button
              key={String(opt)}
              type="button"
              onClick={() => setV({ ...v, plusOne: opt })}
              className={v.plusOne === opt ? "btn-ink" : "btn-quiet"}
            >
              {opt ? "Yes" : "No"}
            </button>
          ))}
        </div>
      </fieldset>
      {v.plusOne ? (
        <label className={label}>
          +1 Name
          <input className={field} value={v.plusOneName} maxLength={100} onChange={(e) => setV({ ...v, plusOneName: e.target.value })} />
        </label>
      ) : null}
      <label className={label}>
        Contact number
        <input type="tel" className={field} value={v.phone} maxLength={20} onChange={(e) => setV({ ...v, phone: e.target.value })} />
      </label>
      <label className={label}>
        Email
        <input type="email" className={field} value={v.email} maxLength={255} onChange={(e) => setV({ ...v, email: e.target.value })} />
      </label>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <div className="text-center">
        <button type="submit" disabled={busy} className="btn-ink">
          {busy ? "Saving…" : "Send RSVP"}
        </button>
      </div>
    </form>
  );
}

const msgSchema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  message: z.string().trim().min(1, "Please write a little something").max(2000),
});

export function GuestMessageForm() {
  const [v, setV] = useState({ name: "", message: "" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = msgSchema.safeParse(v);
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Please check the form");
    setError(null);
    setBusy(true);
    const { error: err } = await supabase.from("guest_messages").insert(parsed.data);
    setBusy(false);
    if (err) return setError("Something went wrong — please try again.");
    setDone(true);
  }

  if (done)
    return (
      <div className="card-organic relative px-6 py-14 text-center">
        <p className="script text-4xl text-primary">It’s saved 💌</p>
        <p className="mt-3 font-display text-lg italic text-primary/80">
          Future us will be very happy you left this here.
        </p>
      </div>
    );

  return (
    <form onSubmit={submit} className="card-organic card-organic-alt relative space-y-6 px-6 py-10 sm:px-10">
      <HeartDoodle className="absolute -left-3 -top-4 w-8 text-rose twinkle" />
      <label className={label}>
        Your name
        <input className={field} value={v.name} maxLength={100} onChange={(e) => setV({ ...v, name: e.target.value })} />
      </label>
      <label className={label}>
        Your message to us
        <textarea rows={5} className={field} value={v.message} maxLength={2000} onChange={(e) => setV({ ...v, message: e.target.value })} />
      </label>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <div className="text-center">
        <button type="submit" disabled={busy} className="btn-ink">
          {busy ? "Saving…" : "Leave it for the newlyweds ♡"}
        </button>
      </div>
    </form>
  );
}
