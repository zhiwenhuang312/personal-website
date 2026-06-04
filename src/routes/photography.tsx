import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const watermarkText = "© Zhiwen Huang";

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

function Watermark() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-4">
      <span
        className="text-base font-normal tracking-normal text-white/95 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        {watermarkText}
      </span>
    </div>
  );
}

function WatermarkedPhoto({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div className="relative">
      <img src={src} alt={alt} loading="lazy" className={className} />
      <Watermark />
    </div>
  );
}

function Photography() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">

      <p className="mt-5 max-w-6xl text-muted-foreground">
        I also enjoy travel and nature photography as a personal hobby of mine.
Here is a small portfolio of some photos I found personally compelling.
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
              <WatermarkedPhoto
                src={p.src}
                alt={p.alt}
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
        render={{
          slide: ({ slide }: { slide: { src: string; alt?: string } }) => (
            <div className="flex h-full w-full items-center justify-center p-4">
              <div className="relative max-h-full max-w-full">
                <img
                  src={slide.src}
                  alt={slide.alt ?? "photo"}
                  className="max-h-[85vh] max-w-[92vw] object-contain"
                />
                <Watermark />
              </div>
            </div>
          ),
        }}
        styles={{ container: { backgroundColor: "rgba(10,10,15,0.95)" } }}
      />
    </div>
  );
}
