import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { createHash } from "crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

type GeoData = {
  country?: string;
  country_code?: string;
  city?: string;
  region?: string;
  lat?: number;
  lng?: number;
};

async function lookupGeo(ip: string): Promise<GeoData | null> {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { "User-Agent": "academic-site/1.0" },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as Record<string, unknown>;
    if (json.error) return null;
    return {
      country: (json.country_name as string) ?? undefined,
      country_code: (json.country_code as string) ?? undefined,
      city: (json.city as string) ?? undefined,
      region: (json.region as string) ?? undefined,
      lat: typeof json.latitude === "number" ? (json.latitude as number) : undefined,
      lng: typeof json.longitude === "number" ? (json.longitude as number) : undefined,
    };
  } catch {
    return null;
  }
}

function extractIp(headers: Record<string, string | undefined>): string | null {
  const xff = headers["x-forwarded-for"];
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    headers["cf-connecting-ip"] ||
    headers["x-real-ip"] ||
    headers["true-client-ip"] ||
    null
  );
}

export const recordVisit = createServerFn({ method: "POST" }).handler(
  async () => {
    const headers = getRequestHeaders() as Record<string, string | undefined>;
    const ip = extractIp(headers);

    // No usable public IP (local dev / private network) → skip silently
    if (
      !ip ||
      ip === "::1" ||
      ip.startsWith("127.") ||
      ip.startsWith("10.") ||
      ip.startsWith("192.168.") ||
      ip.startsWith("172.")
    ) {
      return { ok: true, skipped: true as const };
    }

    const ip_hash = createHash("sha256")
      .update(ip + "|salt-ivan-huang")
      .digest("hex");

    // Dedupe: 1 row per IP per 24h
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: existing } = await supabaseAdmin
      .from("visitors")
      .select("id")
      .eq("ip_hash", ip_hash)
      .gte("created_at", since)
      .limit(1);

    if (existing && existing.length > 0) {
      return { ok: true, deduped: true as const };
    }

    const geo = await lookupGeo(ip);
    if (!geo || !geo.country) {
      return { ok: true, no_geo: true as const };
    }

    const { error } = await supabaseAdmin.from("visitors").insert({
      ip_hash,
      country: geo.country ?? null,
      country_code: geo.country_code ?? null,
      city: geo.city ?? null,
      region: geo.region ?? null,
      lat: geo.lat ?? null,
      lng: geo.lng ?? null,
    });

    if (error) {
      console.error("[recordVisit] insert failed", error);
      return { ok: false as const, error: error.message };
    }

    return { ok: true };
  },
);

export const getVisitors = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error } = await supabaseAdmin
      .from("visitors")
      .select("country, country_code, city, lat, lng, created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      console.error("[getVisitors] failed", error);
      return { points: [], recent: [], totalVisits: 0, totalCountries: 0 };
    }

    const rows = data ?? [];
    const points = rows
      .filter((r) => typeof r.lat === "number" && typeof r.lng === "number")
      .map((r) => ({
        lat: r.lat as number,
        lng: r.lng as number,
        city: r.city ?? "",
        country: r.country ?? "",
      }));

    const recent = rows.slice(0, 12).map((r) => ({
      city: r.city ?? "",
      country: r.country ?? "",
      country_code: r.country_code ?? "",
      created_at: r.created_at,
    }));

    const countries = new Set(rows.map((r) => r.country).filter(Boolean));

    return {
      points,
      recent,
      totalVisits: rows.length,
      totalCountries: countries.size,
    };
  },
);
