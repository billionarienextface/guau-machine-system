-- GUAU Machine - Agency Operating System Schema

CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  category text,
  city text,
  phone text,
  whatsapp text,
  google_place_id text,
  rating float,
  review_count int,
  level text CHECK (level IN ('BASE','LUXE','ATELIER')) DEFAULT 'BASE',
  status text CHECK (status IN ('NEW','AUDITED','CONTACTED','CALLED','CLOSED','CLIENT')) DEFAULT 'NEW',
  grid_score_before int DEFAULT 6,
  grid_score_after int,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TABLE audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  grid_data jsonb,
  map_png_url text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  plan text CHECK (plan IN ('BASE','LUXE','ATELIER')),
  mrr int DEFAULT 0,
  status text DEFAULT 'ACTIVE',
  start_date timestamp DEFAULT now(),
  created_at timestamp DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_city ON leads(city);
CREATE INDEX idx_leads_level ON leads(level);
CREATE INDEX idx_audits_lead_id ON audits(lead_id);
CREATE INDEX idx_clients_lead_id ON clients(lead_id);
