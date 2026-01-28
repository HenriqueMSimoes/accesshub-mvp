-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================
-- CLIENTS
-- =====================
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  document TEXT,
  contact TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

  CONSTRAINT clients_user_fk
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_clients_user_id ON clients(user_id);

-- =====================
-- SERVERS
-- =====================
CREATE TABLE servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  client_id UUID NOT NULL,
  name TEXT NOT NULL,
  host TEXT NOT NULL,
  environment TEXT,
  os TEXT,
  type TEXT,
  admin_user TEXT,
  admin_password TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

  CONSTRAINT servers_user_fk
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  CONSTRAINT servers_client_fk
    FOREIGN KEY (client_id)
    REFERENCES clients(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_servers_user_id ON servers(user_id);
CREATE INDEX idx_servers_client_id ON servers(client_id);

-- =====================
-- PORTS
-- =====================
CREATE TABLE ports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  server_id UUID NOT NULL,
  port INTEGER NOT NULL,
  protocol TEXT,
  service TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

  CONSTRAINT ports_user_fk
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  CONSTRAINT ports_server_fk
    FOREIGN KEY (server_id)
    REFERENCES servers(id)
    ON DELETE CASCADE,

  UNIQUE (server_id, port)
);

CREATE INDEX idx_ports_user_id ON ports(user_id);
CREATE INDEX idx_ports_server_id ON ports(server_id);

-- =====================
-- SOFTWARES
-- =====================
CREATE TABLE softwares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  server_id UUID NOT NULL,
  name TEXT,
  type TEXT,
  version TEXT,
  main_port INTEGER,

  CONSTRAINT softwares_user_fk
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  CONSTRAINT softwares_server_fk
    FOREIGN KEY (server_id)
    REFERENCES servers(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_softwares_user_id ON softwares(user_id);
CREATE INDEX idx_softwares_server_id ON softwares(server_id);

-- =====================
-- LINKS
-- =====================
CREATE TABLE links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  software_id UUID NOT NULL,
  url TEXT,
  type TEXT,
  environment TEXT,
  auth_required BOOLEAN,

  CONSTRAINT links_user_fk
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  CONSTRAINT links_software_fk
    FOREIGN KEY (software_id)
    REFERENCES softwares(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_links_user_id ON links(user_id);
CREATE INDEX idx_links_software_id ON links(software_id);
