import { createFileRoute, Link } from "@tanstack/react-router";

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
    </div>
  );
}
