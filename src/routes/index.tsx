import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
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
    <div className="relative mx-auto w-full max-w-[19rem] lg:mx-0">
      <div className="absolute inset-6 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative shadow-[0_24px_80px_-48px_rgba(0,0,0,0.95)]">
        {photoAvailable ? (
          <img
            src={profilePhotoSrc}
            alt="Portrait of Zhiwen Huang"
            className="aspect-[4/4] w-full rounded-full object-cover"
            onError={() => setPhotoAvailable(false)}
          />
        ) : (
          <div className="flex aspect-[4/5] w-full flex-col justify-end rounded-full border border-dashed border-gold/35 bg-gradient-to-br from-gold/10 via-card to-indigo-glow/15 p-6">
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

function ContactLinks() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm sm:text-base">
      <a className="link-gold" href="mailto:zhiwenh@clemson.edu">
        Email
      </a>
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
        href="https://www.linkedin.com/in/zhiwen-ivan-huang-53b0282a0"
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>
    </div>
  );
}

function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-20 pb-12">
      <section className="relative noise grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] text-foreground sm:text-4xl">
            Zhiwen (Ivan) Huang
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            I am a Ph.D. student in the{" "}
            <a
              className="link-gold"
              href="https://www.clemson.edu/cecas/departments/ie/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Department of Industrial Engineering at Clemson University
              (Operations Research Track)
            </a>
            , advised by{" "}
            <a
              className="link-gold"
              href="https://sites.google.com/site/yongjiasongshom/"
              target="_blank"
              rel="noreferrer"
            >
              Yongjia Song
            </a>
            . My research focuses on optimization under uncertainty 
            , integrating methods from operations research and AI to support
            sequential decision-making in transportation, logistics, disaster
            relief, and pricing. I have also had the privilege of
            collaborating with{" "}
            <a
              className="link-gold"
              href="https://mervebodur.github.io/"
              target="_blank"
              rel="noreferrer"
            >
              Merve Bodur
            </a>{" "}
            and{" "}
            <a
              className="link-gold"
              href="https://sites.google.com/view/margaritacastro"
              target="_blank"
              rel="noreferrer"
            >
              Margarita Paz Castro
            </a>
            .
          </p>
          <ContactLinks />
        </div>

        <ProfilePhoto />
      </section>

      <div className="hairline my-16" />

      <section>
        <h2 className="font-serif text-2xl leading-tight text-foreground sm:text-3xl">
          Education
        </h2>
        <p className="mt-3 whitespace-nowrap text-base leading-8 text-muted-foreground sm:text-lg">
          Ph.D. in Industrial Engineering (Operations Research Track), Clemson University, 2024 Aug. - present.
        </p>
        <div className="hairline mt-8" />
      </section>

      <section className="mt-10 max-w-4xl">
        <h2 className="font-serif text-2xl leading-tight text-foreground sm:text-3xl">
          Research Interests
        </h2>
        <div className="mt-3 space-y-3 text-base leading-8 text-muted-foreground sm:text-lg">
          <p>
            <span className="text-foreground">Methodology:</span>{" "}
            Contexual optimization, stochastic optimization, sequential decision-making, optimization under uncertainty.
          </p>
          <p>
            <span className="text-foreground">Applications:</span>{" "}
            Disaster relief logistics, transportation, pricing, supply chain management.
          </p>
        </div>
        <div className="hairline mt-8" />
      </section>

      <section>
        <h2 className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">
          Where you're reading from
        </h2>
        <p className="mt-3 max-w-md text-base leading-8 text-muted-foreground sm:text-lg">
          Every visit lights up a point on the map.
        </p>
        <div className="mt-6 max-w-3xl">
          <Suspense
            fallback={
              <div className="h-[320px] animate-pulse rounded-xl border border-border bg-card/30" />
            }
          >
            <VisitorMap />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
