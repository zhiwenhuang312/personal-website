import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export const Route = createFileRoute("/photography")({
  head: () => ({
    meta: [
      { title: "Photography — Zhiwen Huang" },
      {
        name: "description",
        content:
          "A small gallery of photographs — one of my hobbies outside research.",
      },
      { property: "og:title", content: "Photography — Zhiwen Huang" },
    ],
  }),
  component: Photography,
});

// Eager-load every JPG/PNG you drop into src/assets/photography/
// To add a new photo: place a file in src/assets/photography/ and refresh.
const modules = import.meta.glob(
  "/src/assets/photography/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const photos = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    alt: path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "photo",
  }));

function Photography() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
      <div className="small-caps">Hobby</div>
      <h1 className="mt-3 font-serif text-5xl text-foreground">Photography</h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Light, geometry, the occasional quiet moment. Click any frame to view
        full-size.
      </p>

      {photos.length === 0 ? (
        <div className="mt-16 rounded-xl border border-dashed border-border p-12 text-center">
          <div className="font-serif text-2xl text-foreground">
            Gallery coming soon
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
            Drop your photos into{" "}
            <code className="text-gold-soft">src/assets/photography/</code> and
            they'll appear here automatically — masonry layout, lightbox on
            click, fully responsive.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 opacity-30">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-md border border-border bg-gradient-to-br from-card to-secondary"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {photos.map((p, i) => (
            <button
              key={p.src}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="mb-4 block w-full overflow-hidden rounded-md border border-border group break-inside-avoid"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={photos.map((p) => ({ src: p.src, alt: p.alt }))}
        styles={{ container: { backgroundColor: "rgba(10,10,15,0.95)" } }}
      />
    </div>
  );
}
