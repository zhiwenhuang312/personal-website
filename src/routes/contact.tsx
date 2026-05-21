import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Zhiwen Huang" },
      {
        name: "description",
        content:
          "Reach out to Zhiwen (Ivan) Huang — Clemson University, Department of Industrial Engineering.",
      },
      { property: "og:title", content: "Contact — Zhiwen Huang" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-12">
      <div className="small-caps">Get in touch</div>
      <h1 className="mt-3 font-serif text-5xl text-foreground">Contact</h1>
      <p className="mt-5 max-w-xl text-muted-foreground">
        Always happy to discuss research collaborations, internships, or just
        operations research in general.
      </p>

      <dl className="mt-12 grid sm:grid-cols-2 gap-y-8 gap-x-12">
        <div>
          <dt className="small-caps">Email</dt>
          <dd className="mt-2 font-serif text-xl">
            <a className="link-gold" href="mailto:zhiwenh@clemson.edu">
              zhiwenh@clemson.edu
            </a>
          </dd>
          <dd className="text-sm text-muted-foreground mt-1">
            <a className="link-gold" href="mailto:zhiwenhuang312@gmail.com">
              zhiwenhuang312@gmail.com
            </a>
          </dd>
        </div>

        <div>
          <dt className="small-caps">Phone</dt>
          <dd className="mt-2 font-serif text-xl text-foreground">
            +1 864 650 2226
          </dd>
        </div>

        <div>
          <dt className="small-caps">Affiliation</dt>
          <dd className="mt-2 text-foreground">
            Department of Industrial Engineering
            <br />
            Clemson University
            <br />
            Clemson, SC 29631, USA
          </dd>
        </div>

        <div>
          <dt className="small-caps">Elsewhere</dt>
          <dd className="mt-2 space-y-1">
            <div>
              <a
                className="link-gold"
                href="https://scholar.google.com/citations?user=Ui_llDYAAAAJ&hl=zh-CN"
                target="_blank"
                rel="noreferrer"
              >
                Google Scholar
              </a>
            </div>
          </dd>
        </div>
      </dl>

      <div className="mt-16">
        <a
          href="mailto:zhiwenh@clemson.edu"
          className="inline-flex items-center rounded-full border border-gold/50 text-gold px-6 py-3 text-sm hover:bg-gold/10 transition-colors"
        >
          Send me an email →
        </a>
      </div>
    </div>
  );
}
