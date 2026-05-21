import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type Point = { lat: number; lng: number; city: string; country: string };

export function WorldMap({ points }: { points: Point[] }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-card/50">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165 }}
        width={980}
        height={500}
        style={{ width: "100%", height: "auto" }}
      >
        <defs>
          <radialGradient id="dotGlow">
            <stop offset="0%" stopColor="oklch(0.82 0.13 82)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.82 0.13 82)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "oklch(0.22 0.025 270)",
                    stroke: "oklch(1 0 0 / 0.08)",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                  hover: {
                    fill: "oklch(0.28 0.03 270)",
                    outline: "none",
                  },
                  pressed: { fill: "oklch(0.28 0.03 270)", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {points.map((p, i) => (
          <Marker key={`${p.lat}-${p.lng}-${i}`} coordinates={[p.lng, p.lat]}>
            <circle r={8} fill="url(#dotGlow)" />
            <circle r={2.5} fill="oklch(0.85 0.14 82)" />
            <title>
              {p.city ? `${p.city}, ${p.country}` : p.country}
            </title>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
