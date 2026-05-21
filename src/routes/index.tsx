import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Suspense, useState } from "react";
import { WorldMap } from "@/components/WorldMap";
import { getVisitors } from "@/lib/visitors.functions";

const profilePhotoSrc = "/profile/zhiwen-huang.jpg";

const visitorsQueryOptions = (fn: () => ReturnType<typeof getVisitors>) =>
  queryOptions({
    queryKey: ["visitors"],
    queryFn: () => fn(),
    staleTime: 60_000,
  });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zhiwen (Ivan) Huang - Operations Research, Clemson" },
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

function ProfilePhoto() {
  const [photoAvailable, setPhotoAvailable] = useState(true);

  return (
    <div className="relative mx-auto w-full max-w-sm lg:mx-0">
      <div className="absolute inset-6 rounded-[2rem] bg-gold/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-card/70 p-3 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.95)] backdrop-blur">
        {photoAvailable ? (
          <img
            src={profilePhotoSrc}
            alt="Portrait of Zhiwen Huang"
            className="aspect-[4/5] w-full rounded-[1.45rem] object-cover"
            onError={() => setPhotoAvailable(false)}
          />
        ) : (
          <div className="flex aspect-[4/5] w-full flex-col justify-end rounded-[1.45rem] border border-dashed border-gold/35 bg-gradient-to-br from-gold/10 via-card to-indigo-glow/15 p-6">
            <div className="small-caps">Profile photo</div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Add your image at{" "}
              <span className="text-foreground">
                public/profile/zhiwen-huang.jpg
              </span>{" "}
              and it will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-20 pb-12">
      <section className="relative noise grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="small-caps">Industrial Engineering &middot; OR Track</div>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-foreground sm:text-7xl">
            Zhiwen <span className="text-gold glow-gold">(Ivan)</span> Huang
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Second-year Ph.D. student at{" "}
            <span className="text-foreground">Clemson University</span>, working
            at the intersection of operations research and AI. My research
            focuses on{" "}
            <span className="text-foreground">
              multi-stage stochastic optimization with decision-dependent
              uncertainty
            </span>{" "}
            - with applications across transportation, logistics, disaster
            relief, and pricing.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/research"
              className="rounded-full border border-gold/50 px-5 py-2 text-sm text-gold transition-colors hover:bg-gold/10"
            >
              Research &rarr;
            </Link>
            <Link
              to="/publications"
              className="rounded-full border border-border px-5 py-2 text-sm transition-colors hover:bg-secondary"
            >
              Publications
            </Link>
            <Link
              to="/cv"
              className="rounded-full border border-border px-5 py-2 text-sm transition-colors hover:bg-secondary"
            >
              CV
            </Link>
          </div>
        </div>

        <ProfilePhoto />
      </section>

      <div className="hairline my-20" />

      <section className="grid gap-8 sm:grid-cols-3">
        <div>
          <div className="small-caps">Currently</div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Incoming Data Scientist Intern at{" "}
            <span className="text-foreground">
              Universal Destinations &amp; Experiences
            </span>{" "}
            - Global Pricing Analytics, Fall 2026.
          </p>
        </div>
        <div>
          <div className="small-caps">Interests</div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Stochastic programming &middot; ADP &middot; Contextual optimization
            &middot; Reinforcement learning &middot; Disaster relief logistics
          </p>
        </div>
      </section>

      <div className="hairline my-20" />

      <section>
        <div className="small-caps">Selected Work</div>
        <ul className="mt-6 divide-y divide-border">
          {[
            {
              title:
                "Sequential Decision Optimization for Disaster Relief Logistics",
              note:
                "Multi-stage stochastic optimization w/ decision-dependent uncertainty - 60% gap reduction via tailored cutting planes",
            },
            {
              title:
                "Stochastic Network Design under Endogenous & Exogenous Uncertainty",
              note: "Decomposition for resilient infrastructure planning",
            },
            {
              title: "On-Demand Food Order Assignment & Rider Routing",
              note: "MIP joint assignment + routing on Meituan's real-world data",
            },
          ].map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:gap-6"
            >
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
          See all research &rarr;
        </Link>
      </section>

      <div className="hairline my-20" />

      <section id="contact" className="grid gap-12 lg:grid-cols-2">
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
                Clemson University &middot; Clemson, SC 29631, USA
              </dd>
            </div>
            <div>
              <dt className="small-caps">Elsewhere</dt>
              <dd className="mt-1 flex flex-col items-start gap-2">
                <a
                  className="link-gold"
                  href="https://scholar.google.com/citations?user=Ui_llDYAAAAJ&hl=zh-CN"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Scholar
                </a>
                <a
                  className="link-gold"
                  href="https://www.linkedin.com/in/zhiwen-huang-53b0282a0/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
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
                <div className="h-[320px] animate-pulse rounded-xl border border-border bg-card/30" />
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
