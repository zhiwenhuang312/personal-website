import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Zhiwen Huang" },
      {
        name: "description",
        content:
          "Research projects in stochastic optimization, disaster relief logistics, network design, and on-demand delivery.",
      },
      { property: "og:title", content: "Research — Zhiwen Huang" },
    ],
  }),
  component: Research,
});

type Project = { title: string; bullets: string[] };
type Group = { institution: string; period: string; role: string; projects: Project[] };

const groups: Group[] = [
  {
    institution: "Clemson University",
    period: "2024 — present",
    role: "Graduate Research Assistant",
    projects: [
      {
        title: "Sequential Decision Optimization for Disaster Relief Logistics",
        bullets: [
          "Formulated a multi-stage stochastic optimization model for disaster relief logistics under decision-dependent uncertainty, with applications to large-scale evacuation planning.",
          "Developed and implemented a model-based approximate dynamic programming framework with tailored cutting-plane methods in Gurobi, reducing the optimality gap by 60%.",
        ],
      },
      {
        title: "Stochastic Network Design with Endogenous and Exogenous Uncertainty",
        bullets: [
          "Developed a large-scale stochastic network design model for resilient infrastructure planning under endogenous and exogenous uncertainty.",
          "Solved the model by decomposition algorithm and analyzed trade-offs among protection investment, network reliability, and post-disruption transportation costs.",
        ],
      },
      {
        title: "On-Demand Food Order Assignment and Rider Routing Problem",
        bullets: [
          "Developed a mixed-integer programming model to jointly optimize order–rider assignment and routing in on-demand food delivery systems with time-window constraints.",
          "Implemented and tested the model in Gurobi using Meituan's real-world dataset.",
        ],
      },
    ],
  },
  {
    institution: "Sun Yat-sen University",
    period: "2021 — 2024",
    role: "Graduate Research Assistant",
    projects: [
      {
        title: "Location–Routing Problem under Demand Uncertainty",
        bullets: [
          "Developed a capacitated location–routing model with facility disruption.",
          "Designed a hybrid heuristic achieving ≤1.1% optimality gap and up to 100× speedup over Gurobi on large-scale instances.",
        ],
      },
      {
        title: "Evaluation of System Development Based on Data Analysis",
        bullets: [
          "Built a performance evaluation framework with key indicators and AHP.",
          "Applied gray forecasting for data prediction to support system analysis.",
        ],
      },
      {
        title: "Textbook Co-author: Complex System Modeling and Assessment",
        bullets: [
          "Contributed to an undergraduate textbook on systems engineering.",
          "Authored chapters on decision-making methods and optimization (GA, PSO, other metaheuristics).",
        ],
      },
    ],
  },
];

function Research() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-16 pb-12">
      <div className="small-caps">Research</div>
      <h1 className="mt-3 font-serif text-5xl sm:text-6xl text-foreground">
        Optimization under uncertainty
      </h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Methods: multi-stage stochastic programming, approximate dynamic
        programming, decomposition algorithms. Applications: disaster relief,
        resilient networks, on-demand delivery, pricing.
      </p>

      <div className="mt-16 space-y-20">
        {groups.map((g) => (
          <section key={g.institution}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border pb-4">
              <h2 className="font-serif text-3xl text-foreground">
                {g.institution}
              </h2>
              <div className="text-sm text-muted-foreground">
                <span className="text-gold-soft">{g.period}</span> · {g.role}
              </div>
            </div>

            <ul className="mt-8 space-y-10">
              {g.projects.map((p) => (
                <li key={p.title}>
                  <h3 className="font-serif text-2xl text-foreground">
                    {p.title}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {p.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground leading-relaxed pl-5 relative before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-gold/60"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
