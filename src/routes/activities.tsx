import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Professional Activities - Zhiwen Huang" },
      {
        name: "description",
        content:
          "Teaching, industrial experience, and professional service by Zhiwen Huang.",
      },
      { property: "og:title", content: "Professional Activities - Zhiwen Huang" },
    ],
  }),
  component: Activities,
});

const teaching = [
  "IE 3610 Industrial Applied Probability (2025 Summer) - Teaching Assistant",
  "IE 3860 Production Planning and Control (2025 Summer) - Teaching Assistant",
  "IE 3800 Deterministic Operation Research (2025 Spring) - Teaching Assistant",
  "IE 3840 Engineering Economic Analysis (2024 Fall) - Teaching Assistant",
];

const industrialExperience = [
  "2026 Incoming Data Scientist Intern, Universal Destinations & Experiences, Orlando, FL",
];

const service = [
  "Journal Reviewer, Reliability Engineering & System Safety",
  "2025-present Co-organizer, INFORMS-HFES Mentor-Mentee Program, Clemson University",
  "2024-present Member, Graduate Student Advisory Board, Clemson University",
  "2025-present Vice President, Clemson INFORMS Student Chapter, Clemson University",
];

function Section({
  title,
  items,
  showDivider = true,
}: {
  title: string;
  items: string[];
  showDivider?: boolean;
}) {
  return (
    <section className="mt-14">
      <h2 className="font-serif text-2xl text-gold">{title}</h2>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className="relative pl-5 text-base leading-8 text-muted-foreground before:absolute before:left-0 before:top-3 before:h-1.5 before:w-1.5 before:rounded-full before:bg-gold/60"
          >
            {item}
          </li>
        ))}
      </ul>
      {showDivider ? <div className="hairline mt-8" /> : null}
    </section>
  );
}

function Activities() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-12 pt-16">
      <Section title="Teaching" items={teaching} />
      <Section title="Industrial Experience" items={industrialExperience} />
      <Section title="Service" items={service} showDivider={false} />
    </div>
  );
}
