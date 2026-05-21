import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { getVisitors } from "@/lib/visitors.functions";
import { WorldMap } from "@/components/WorldMap";

const visitorsQueryOptions = (fn: () => ReturnType<typeof getVisitors>) =>
  queryOptions({
    queryKey: ["visitors"],
    queryFn: () => fn(),
    staleTime: 60_000,
  });

export const Route = createFileRoute("/guestbook")({
  head: () => ({
    meta: [
      { title: "Guestbook — Visitors from around the world" },
      {
        name: "description",
        content:
          "A live world map of visitors to Zhiwen Huang's personal website.",
      },
      { property: "og:title", content: "Guestbook — Zhiwen Huang" },
    ],
  }),
  component: Guestbook,
});

function GuestbookInner() {
  const fn = useServerFn(getVisitors);
  const { data } = useSuspenseQuery(visitorsQueryOptions(fn));

  return (
    <>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Stat label="Visits" value={data.totalVisits} />
        <Stat label="Countries" value={data.totalCountries} />
        <Stat label="Cities pinned" value={data.points.length} />
      </div>

      <div className="mt-10">
        <WorldMap points={data.points} />
      </div>

      <section className="mt-14">
        <div className="small-caps">Recent visitors</div>
        {data.recent.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No visitors yet — you might be the first. Welcome.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {data.recent.map((v, i) => (
              <li
                key={i}
                className="py-3 flex items-center justify-between text-sm"
              >
                <span className="text-foreground">
                  {v.city ? `${v.city}, ` : ""}
                  <span className="text-gold-soft">{v.country}</span>
                </span>
                <span className="text-muted-foreground text-xs">
                  {new Date(v.created_at).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-5">
      <div className="small-caps">{label}</div>
      <div className="mt-2 font-serif text-4xl text-gold glow-gold">
        {value}
      </div>
    </div>
  );
}

function Guestbook() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-16 pb-12">
      <div className="small-caps">Guestbook</div>
      <h1 className="mt-3 font-serif text-5xl text-foreground">
        Where you're reading from
      </h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Every visit lights up a point on the map. IP addresses are hashed
        before storage — no personal data is kept.
      </p>

      <Suspense
        fallback={
          <div className="mt-10 h-[420px] rounded-xl border border-border bg-card/30 animate-pulse" />
        }
      >
        <GuestbookInner />
      </Suspense>
    </div>
  );
}
