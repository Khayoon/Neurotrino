CREATE TABLE IF NOT EXISTS nt_ingredients (slug text PRIMARY KEY, name text NOT NULL);
CREATE TABLE IF NOT EXISTS nt_brands (
  id text PRIMARY KEY, name text NOT NULL, founded_year integer, history_source text
);
ALTER TABLE nt_brands ADD COLUMN IF NOT EXISTS history_note text;
CREATE TABLE IF NOT EXISTS nt_products (
  id text PRIMARY KEY, slug text UNIQUE NOT NULL, name text NOT NULL,
  brand_id text NOT NULL REFERENCES nt_brands(id), ingredient_slug text NOT NULL REFERENCES nt_ingredients(slug),
  npn text UNIQUE NOT NULL CHECK (npn ~ '^[0-9]{8}$'), form text NOT NULL,
  licence_holder text NOT NULL, licence_date text NOT NULL, licence_status text NOT NULL,
  checked_at text NOT NULL, manufacturer_url text NOT NULL DEFAULT '',
  aliases jsonb NOT NULL DEFAULT '[]', medicinal jsonb NOT NULL DEFAULT '[]',
  purposes jsonb NOT NULL DEFAULT '[]', risks jsonb NOT NULL DEFAULT '[]'
);
CREATE TABLE IF NOT EXISTS nt_evidence (
  id text PRIMARY KEY, product_id text NOT NULL REFERENCES nt_products(id),
  kind text NOT NULL CHECK (kind IN ('licence','testing','manufacturing','recalls','transparency')),
  verdict text NOT NULL CHECK (verdict IN ('verified','concern','unknown')),
  summary text NOT NULL, source_url text NOT NULL, source_title text NOT NULL,
  publisher text NOT NULL, scope text NOT NULL, checked_at text NOT NULL, expires_at text NOT NULL,
  revision integer NOT NULL DEFAULT 1, UNIQUE(product_id,kind)
);
CREATE TABLE IF NOT EXISTS nt_snapshots (
  id text PRIMARY KEY, product_id text NOT NULL REFERENCES nt_products(id),
  source_url text NOT NULL, retrieved_at text NOT NULL, content jsonb NOT NULL
);
CREATE TABLE IF NOT EXISTS nt_audit (
  id text PRIMARY KEY, product_id text REFERENCES nt_products(id), action text NOT NULL,
  actor text NOT NULL, created_at text NOT NULL, before_data jsonb, after_data jsonb
);
CREATE TABLE IF NOT EXISTS nt_sync_runs (
  id text PRIMARY KEY, started_at text NOT NULL, finished_at text,
  status text NOT NULL, succeeded integer NOT NULL DEFAULT 0, failed integer NOT NULL DEFAULT 0, message text NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS nt_products_ingredient_idx ON nt_products(ingredient_slug);
CREATE INDEX IF NOT EXISTS nt_evidence_product_idx ON nt_evidence(product_id);
CREATE INDEX IF NOT EXISTS nt_audit_product_idx ON nt_audit(product_id,created_at);
-- Server-only tables. No browser client or anonymous write access.
ALTER TABLE nt_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE nt_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE nt_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE nt_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE nt_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE nt_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE nt_sync_runs ENABLE ROW LEVEL SECURITY;
