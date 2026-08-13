import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";

type AuthorizationDetails = {
  client?: { name?: string; client_uri?: string } | null;
  redirect_uri?: string;
  redirect_url?: string;
  redirect_to?: string;
  scope?: string;
};

const oauth = (
  supabase.auth as unknown as {
    oauth: {
      getAuthorizationDetails: (
        id: string,
      ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
      approveAuthorization: (
        id: string,
      ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
      denyAuthorization: (
        id: string,
      ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
    };
  }
).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s["authorization_id"] === "string" ? s["authorization_id"] : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    const next = location.pathname + location.searchStr;
    if (!data.session) throw redirect({ to: "/login", search: { next } });
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center px-5">
      <p className="max-w-md text-center text-sm text-muted-foreground">
        Could not load this authorization request: {String((error as Error)?.message ?? error)}
      </p>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "an app";

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error: err } = approve
      ? await oauth.approveAuthorization(authorization_id)
      : await oauth.denyAuthorization(authorization_id);
    if (err) {
      setBusy(false);
      setError(err.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="wash-rose flex min-h-screen items-center justify-center px-5 py-16">
      <div className="card-organic w-full max-w-md bg-card p-8">
        <p className="text-[0.62rem] tracking-[0.3em] text-muted-foreground uppercase">
          Ayushi &amp; Vishwas
        </p>
        <h1 className="script mt-2 text-3xl text-primary">Connect {clientName}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {clientName} will be able to call this invitation&rsquo;s tools while you are signed in —
          wedding details, the event schedule, venue and directions, Jamshedpur weather and local
          recommendations.
        </p>
        {details?.redirect_uri ? (
          <p className="mt-3 text-xs break-all text-muted-foreground">
            Redirects to {details.redirect_uri}
          </p>
        ) : null}
        {details?.scope ? (
          <p className="mt-2 text-xs text-muted-foreground">Requested access: {details.scope}</p>
        ) : null}
        <p className="mt-3 text-xs text-muted-foreground">
          This does not bypass this app&rsquo;s permissions or backend policies.
        </p>

        {error ? (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button disabled={busy} onClick={() => decide(true)} className="btn-ink">
            Approve
          </button>
          <button disabled={busy} onClick={() => decide(false)} className="btn-quiet">
            Cancel connection
          </button>
        </div>
      </div>
    </main>
  );
}
