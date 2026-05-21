
CREATE TABLE public.visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  country text,
  country_code text,
  city text,
  region text,
  lat double precision,
  lng double precision,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX visitors_ip_hash_created_at_idx ON public.visitors (ip_hash, created_at DESC);
CREATE INDEX visitors_created_at_idx ON public.visitors (created_at DESC);

ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- No public policies: only service_role (server functions) can read/write.
