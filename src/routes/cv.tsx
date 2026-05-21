import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Zhiwen Huang" },
      {
        name: "description",
        content:
          "Curriculum vitae of Zhiwen (Ivan) Huang — education, experience, skills, service, awards.",
      },
      { property: "og:title", content: "CV — Zhiwen Huang" },
    ],
  }),
  component: CV,
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="small-caps">{title}</div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Row({
  left,
  right,
  sub,
  children,
}: {
  left: string;
  right?: string;
  sub?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-4 py-3 border-b border-border/60 last:border-b-0">
      <div className="text-gold-soft text-sm pt-0.5">{left}</div>
      <div>
        <div className="text-foreground">{right}</div>
        {sub ? <div className="text-sm text-muted-foreground mt-0.5">{sub}</div> : null}
        {children ? <div className="mt-2 text-sm text-muted-foreground space-y-1">{children}</div> : null}
      </div>
    </div>
  );
}

function CV() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-16 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="small-caps">Curriculum Vitae</div>
          <h1 className="mt-3 font-serif text-5xl text-foreground">
            Zhiwen (Ivan) Huang
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Department of Industrial Engineering · Clemson University ·
            Clemson, SC 29631, USA
          </p>
        </div>
        <a
          href="/cv.pdf"
          className="rounded-full border border-gold/50 text-gold px-5 py-2 text-sm hover:bg-gold/10 transition-colors self-start"
          download
        >
          Download PDF
        </a>
      </div>

      <Section title="Education">
        <Row
          left="2024 —"
          right="Ph.D., Industrial Engineering (Operations Research Track)"
          sub={
            <>
              Clemson University · Advisor:{" "}
              <a
                className="link-gold"
                href="https://sites.google.com/site/yongjiasongshom/"
                target="_blank"
                rel="noreferrer"
              >
                Yongjia Song
              </a>
            </>
          }
        />
      </Section>

      <Section title="Industrial Experience">
        <Row
          left="2026"
          right="Incoming Data Scientist Intern · Universal Destinations & Experiences"
          sub="Orlando, FL · Global Pricing Analytics (Fall 2026)"
        >
          <p>
            Selected to join the Global Pricing Analytics team, focusing on
            admissions pricing — forecasting and data-driven price optimization
            for sequential pricing decisions.
          </p>
        </Row>
        <Row
          left="2018 — 21"
          right="Marketing & Operations Manager · Tomorrow Advancing Life (TAL)"
          sub="Guangzhou, China"
        >
          <p>
            Analyzed enrollment data, refund feedback, and market trends to
            inform data-driven marketing strategies.
          </p>
          <p>
            Designed a scheduling optimization plan across departments —
            increased student enrollment by 25%+.
          </p>
        </Row>
      </Section>

      <Section title="Skills">
        <div className="space-y-4 text-sm">
          <div>
            <span className="text-gold-soft small-caps">Optimization</span>
            <p className="text-muted-foreground mt-1">
              Stochastic optimization (two-stage & multi-stage), mixed-integer
              programming, dynamic programming, Monte Carlo simulation,
              decomposition algorithms, mathematical modeling.
            </p>
          </div>
          <div>
            <span className="text-gold-soft small-caps">ML &amp; Data</span>
            <p className="text-muted-foreground mt-1">
              Time series analysis, regression, clustering, classification,
              reinforcement learning, statistical analysis.
            </p>
          </div>
          <div>
            <span className="text-gold-soft small-caps">Programming</span>
            <p className="text-muted-foreground mt-1">
              Python, Gurobi, LaTeX, SQL, Linux, MATLAB, R, Git, GitHub,
              Matplotlib.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Service">
        <Row left="2024 —" right="Journal Reviewer, Reliability Engineering & System Safety" />
        <Row left="2025 —" right="Co-organizer, INFORMS–HFES Mentor–Mentee Program, Clemson" />
        <Row left="2025 —" right="Member, Graduate Student Advisory Board, Clemson" />
      </Section>

      <Section title="Leadership">
        <Row left="2025 —" right="Vice President, Clemson INFORMS Student Chapter" />
        <Row
          left="2021 — 22"
          right="Head, Organization Dept., Youth League Committee"
          sub="School of Systems Science and Engineering, Sun Yat-sen University"
        />
        <Row
          left="2016 — 17"
          right="Deputy Head, Publicity Department, Student Union"
          sub="South China Agricultural University"
        />
      </Section>

      <Section title="Honors & Awards">
        <Row left="2022" right="Xu Zhongwei Scholarship (top 5%) · Sun Yat-sen University" />
        <Row left="2022" right="Second Class Academic Prize Scholarship (top 20%) · SYSU" />
        <Row left="2022" right="Best Paper Award, IEEE ICUS (co-author)" />
        <Row left="2021" right="First Class Academic Prize Scholarship (top 5%) · SYSU" />
      </Section>
    </div>
  );
}
