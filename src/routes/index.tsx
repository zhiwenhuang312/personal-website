import { createFileRoute, Link } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zhiwen (Ivan) Huang — Operations Research, Clemson" },
      {
        name: "description",
        content:
          "PhD student in Industrial Engineering (OR Track) at Clemson University. Research on multi-stage stochastic optimization with decision-dependent uncertainty.",
      },
    ],
  }),
  component: Home,
});

function VisitorMap() {
  const fn = useServerFn(getVisitors);
  const { data } = useSuspenseQuery(visitorsQueryOptions(fn));
  return <WorldMap points={data.points} />;
}

function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-20 pb-12">
      <section className="relative noise">
        <div className="small-caps">Industrial Engineering · OR Track</div>
        <h1 className="mt-4 font-serif text-5xl sm:text-7xl leading-[1.05] text-foreground">
          Zhiwen <span className="text-gold glow-gold">(Ivan)</span> Huang
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Second-year Ph.D. student at <span className="text-foreground">Clemson University</span>,
          working at the intersection of operations research and AI. My research
          focuses on{" "}
          <span className="text-foreground">
            multi-stage stochastic optimization with decision-dependent
            uncertainty
          </span>{" "}
          — with applications across transportation, logistics, disaster
          relief, and pricing.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/research"
            className="rounded-full border border-gold/50 text-gold px-5 py-2 text-sm hover:bg-gold/10 transition-colors"
          >
            Research →
          </Link>
          <Link
            to="/publications"
            className="rounded-full border border-border px-5 py-2 text-sm hover:bg-secondary transition-colors"
          >
            Publications
          </Link>
          <Link
            to="/cv"
            className="rounded-full border border-border px-5 py-2 text-sm hover:bg-secondary transition-colors"
          >
            CV
          </Link>
        </div>
      </section>

      <div className="hairline my-20" />

      <section className="grid sm:grid-cols-3 gap-8">
        <div>
          <div className="small-caps">Currently</div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Graduate Research Assistant with{" "}
            <a
              className="link-gold"
              href="https://sites.google.com/site/yongjiasongshom/"
              target="_blank"
              rel="noreferrer"
            >
              Yongjia Song
            </a>
            . Developing model-based ADP for large-scale evacuation planning.
          </p>
        </div>
        <div>
          <div className="small-caps">Next</div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Incoming Data Scientist Intern at{" "}
            <span className="text-foreground">
              Universal Destinations &amp; Experiences
            </span>{" "}
            — Global Pricing Analytics, Fall 2026.
          </p>
        </div>
        <div>
          <div className="small-caps">Interests</div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Stochastic programming · ADP · Contextual optimization ·
            Reinforcement learning · Disaster relief logistics
          </p>
        </div>
      </section>

      <div className="hairline my-20" />

      <section>
        <div className="small-caps">Selected Work</div>
        <ul className="mt-6 divide-y divide-border">
          {[
            {
              title: "Sequential Decision Optimization for Disaster Relief Logistics",
              note: "Multi-stage stochastic optimization w/ decision-dependent uncertainty · 60% gap reduction via tailored cutting planes",
            },
            {
              title: "Stochastic Network Design under Endogenous & Exogenous Uncertainty",
              note: "Decomposition for resilient infrastructure planning",
            },
            {
              title: "On-Demand Food Order Assignment & Rider Routing",
              note: "MIP joint assignment + routing on Meituan's real-world data",
            },
          ].map((item) => (
            <li key={item.title} className="py-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
              <h3 className="font-serif text-xl text-foreground sm:flex-1">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground sm:max-w-sm">
                {item.note}
              </p>
            </li>
          ))}
        </ul>
        <Link
          to="/research"
          className="mt-6 inline-block text-sm text-gold hover:opacity-80"
        >
          See all research →
        </Link>
      </section>

      <div className="hairline my-20" />

      <section id="contact" className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="small-caps">Get in touch</div>
          <h2 className="mt-3 font-serif text-4xl text-foreground">Contact</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Always happy to discuss research collaborations, internships, or
            just operations research in general.
          </p>

          <dl className="mt-8 space-y-6">
            <div>
              <dt className="small-caps">Email</dt>
              <dd className="mt-1 font-serif text-lg">
                <a className="link-gold" href="mailto:zhiwenh@clemson.edu">
                  zhiwenh@clemson.edu
                </a>
              </dd>
              <dd className="text-sm text-muted-foreground">
                <a className="link-gold" href="mailto:zhiwenhuang312@gmail.com">
                  zhiwenhuang312@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="small-caps">Phone</dt>
              <dd className="mt-1 font-serif text-lg text-foreground">
                +1 864 650 2226
              </dd>
            </div>
            <div>
              <dt className="small-caps">Affiliation</dt>
              <dd className="mt-1 text-foreground">
                Department of Industrial Engineering
                <br />
                Clemson University · Clemson, SC 29631, USA
              </dd>
            </div>
            <div>
              <dt className="small-caps">Elsewhere</dt>
              <dd className="mt-1">
                <a
                  className="link-gold"
                  href="https://scholar.google.com/citations?user=Ui_llDYAAAAJ&hl=zh-CN"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Scholar
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <div className="small-caps">Visitors</div>
          <h2 className="mt-3 font-serif text-4xl text-foreground">
            Where you're reading from
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Every visit lights up a point on the map. IPs are hashed before
            storage.
          </p>
          <div className="mt-8">
            <Suspense
              fallback={
                <div className="h-[320px] rounded-xl border border-border bg-card/30 animate-pulse" />
              }
            >
              <VisitorMap />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
