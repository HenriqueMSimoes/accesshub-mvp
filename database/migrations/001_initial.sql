-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CLIENTS
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  document TEXT,
  contact TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- SERVERS
CREATE TABLE servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  host TEXT NOT NULL,
  environment TEXT,
  os TEXT,
  type TEXT,
  admin_user TEXT,
  admin_password TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- PORTS
CREATE TABLE ports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
  port INTEGER NOT NULL,
  protocol TEXT,
  service TEXT,
  status TEXT,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE (server_id, port)
);

-- SOFTWARES
CREATE TABLE softwares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID REFERENCES servers(id),
  name TEXT,
  type TEXT,
  version TEXT,
  main_port INTEGER
);

-- LINKS
CREATE TABLE links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  software_id UUID REFERENCES softwares(id),
  url TEXT,
  type TEXT,
  environment TEXT,
  auth_required BOOLEAN
);
