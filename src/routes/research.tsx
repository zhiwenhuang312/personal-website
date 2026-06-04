import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research - Zhiwen Huang" },
      {
        name: "description",
        content:
          "Journal articles, conference proceedings, and presentations by Zhiwen Huang.",
      },
      { property: "og:title", content: "Research - Zhiwen Huang" },
    ],
  }),
  component: Research,
});

type Pub = {
  year: string;
  authors: string;
  title: string;
  venue: string;
  pages?: string;
};

const journal: Pub[] = [
  {
    year: "2026",
    authors: "**Z. Huang**, M. Bodur, M. P. Castro, Y. Song",
    title:
      "Multi-stage Stochastic Mixed-Integer Programming with Decision-dependent Uncertainty: An Application in Hurricane Evacuation Planning Problems",
    venue: "Working paper",
  },
  {
    year: "2024",
    authors: "Y. Zhong, H. Li, Q. Sun, **Z. Huang**, Y. Zhang",
    title:
      "A kill chain optimization method for improving the resilience of unmanned system-of-systems",
    venue: "Chaos, Solitons & Fractals",
    pages: "181: 114685",
  },
  {
    year: "2023",
    authors: "**Z. Huang**, H. Li, Y. Zhong, Z. Cao, Q. Su, N. Lv, Y. Zhang",
    title:
      "A study on emergency distribution center location under demand uncertainty",
    venue: "Computer Engineering and Applications",
    pages: "59(04): 269-279",
  },
  {
    year: "2023",
    authors: "H. Li, Q. Sun, Y. Zhong, **Z. Huang**, Y. Zhang",
    title:
      "A soft resource optimization method for improving the resilience of UAV swarms under continuous attack",
    venue: "Reliability Engineering & System Safety",
    pages: "237: 109368",
  },
];

const conference: Pub[] = [
  {
    year: "2022",
    authors: "**Z. Huang**, H. Li, Y. Zhong, Q. Su, N. Lv, Y. Zhang",
    title: "Reliable facility location with fuzzy demand and failure scenarios",
    venue: "2022 IEEE International Conference on Unmanned Systems (ICUS)",
    pages: "pp. 321-326",
  },
  {
    year: "2022",
    authors: "Q. Su, Y. Zhong, Y. Zeng, Z. Cao, **Z. Huang**, N. Lv, Y. Zhang",
    title:
      "Target Intention Recognition Model Based on SMOTE-AdaBoost under Unbalanced Samples",
    venue: "2022 IEEE International Conference on Unmanned Systems (ICUS)",
    pages: "pp. 01-05",
  },
  {
    year: "2022",
    authors: "H. Li, **Z. Huang**, Y. Zhong, Z. Cao, Q. Su, N. Lv, Y. Zhang",
    title:
      "A two-stage task clustering method of multi-UAV considering allocation balance",
    venue: "Air Intelligence Game Forum",
  },
];

const presentations: Pub[] = [
  {
    year: "2025",
    authors: "**Z. Huang**, Y. Song, M. Bodur, M. Castro",
    title:
      "Multi-stage Stochastic Programming with Decision-dependent Uncertainty: A Preliminary Study on the Multi-stage Newsvendor Problem",
    venue:
      "Poster, Clemson University Industrial Engineering Homecoming Poster Competition, Clemson, SC",
  },
  {
    year: "2022",
    authors: "**Z. Huang**, H. Li, Y. Zhong, Q. Su, N. Lv, Y. Zhang",
    title: "Reliable Facility Location with Fuzzy Demand and Failure Scenarios",
    venue:
      "Oral, 2022 IEEE International Conference on Unmanned Systems, Guangzhou, China",
  },
];

function renderAuthors(s: string) {
  const parts = s.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <span key={i} className="font-medium text-foreground">
        {p.slice(2, -2)}
      </span>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

function PubItem({ p }: { p: Pub }) {
  return (
    <li className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-border py-5 last:border-b-0">
      <div className="pt-1 text-sm text-gold-soft">{p.year}</div>
      <div>
        <div className="text-sm text-muted-foreground">
          {renderAuthors(p.authors)}.
        </div>
        <div className="mt-1 font-serif text-lg leading-snug text-foreground">
          {p.title}.
        </div>
        <div className="mt-1 text-sm italic text-muted-foreground">
          {p.venue}
          {p.pages ? `, ${p.pages}` : ""}.
        </div>
      </div>
    </li>
  );
}

function Research() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-12 pt-16">
      <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
        My research focuses on optimization under uncertainty. If you are interested in
        related research topics or potential collaboration, please feel free
        to reach out.
      </p>

      <section className="mt-14">
        <h2 className="font-serif text-2xl text-gold">Journal Articles</h2>
        <ul className="mt-4">
          {journal.map((p) => (
            <PubItem key={p.title} p={p} />
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl text-gold">
          Conference Proceedings
        </h2>
        <ul className="mt-4">
          {conference.map((p) => (
            <PubItem key={p.title} p={p} />
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl text-gold">Presentations</h2>
        <ul className="mt-4">
          {presentations.map((p) => (
            <PubItem key={p.title} p={p} />
          ))}
        </ul>
      </section>

      <p className="mt-10 text-sm text-muted-foreground">
        See full publication list on{" "}
        <a
          href="https://scholar.google.com/citations?user=Ui_llDYAAAAJ&hl=zh-CN"
          className="link-gold"
          target="_blank"
          rel="noreferrer"
        >
          Google Scholar
        </a>
        .
      </p>
    </div>
  );
}
