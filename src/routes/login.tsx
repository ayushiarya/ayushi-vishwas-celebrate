import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

function safeNext(value: unknown): string {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export const Route = createFileRoute("/login")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({ next: safeNext(s["next"]) }),
  head: () => ({
    meta: [
      { title: "Sign in · Ayushi & Vishwas" },
      {
        name: "description",
        content:
          "Sign in to connect Ayushi & Vishwas's wedding invitation to your assistant or approve an app connection.",
      },
      { property: "og:title", content: "Sign in · Ayushi & Vishwas" },
      {
        property: "og:description",
        content: "Sign in to approve a connection to Ayushi & Vishwas's wedding invitation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.replace(next);
    });
  }, [next]);

  async function withEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    if (mode === "signin") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (err) return setError(err.message);
      window.location.replace(next);
      return;
    }
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}${next}` },
    });
    setBusy(false);
    if (err) return setError(err.message);
    setMessage("Check your inbox to confirm your email, then come back here.");
  }

  async function withGoogle() {
    setBusy(true);
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/login?next=${encodeURIComponent(next)}`,
    });
    if (result.error) {
      setBusy(false);
      setError(String(result.error));
      return;
    }
    if (result.redirected) return;
    void navigate({ href: next });
  }

  return (
    <main className="wash-rose flex min-h-screen items-center justify-center px-5 py-16">
      <div className="card-organic w-full max-w-md bg-card p-8">
        <p className="text-[0.62rem] tracking-[0.3em] text-muted-foreground uppercase">
          Ayushi &amp; Vishwas
        </p>
        <h1 className="script mt-2 text-3xl text-primary">
          {mode === "signin" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to approve connecting this invitation to your assistant.
        </p>

        {error ? (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        ) : null}
        {message ? <p className="mt-4 text-sm text-muted-foreground">{message}</p> : null}

        <form onSubmit={withEmail} className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <button type="submit" disabled={busy} className="btn-ink justify-center">
            {mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <button
          type="button"
          disabled={busy}
          onClick={withGoogle}
          className="btn-quiet mt-3 w-full justify-center"
        >
          Continue with Google
        </button>

        <button
          type="button"
          className="mt-5 text-xs text-muted-foreground underline"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
