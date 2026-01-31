create table public.servers (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  client_id uuid not null,
  name text not null,
  host text not null,
  environment text null,
  os text null,
  type text null,
  admin_user text null,
  admin_password text null,
  notes text null,
  created_at timestamp with time zone null default now(),
  constraint servers_pkey primary key (id),
  constraint servers_client_fk foreign KEY (client_id) references clients (id) on delete CASCADE,
  constraint servers_user_fk foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_servers_user_id on public.servers using btree (user_id) TABLESPACE pg_default;

create index IF not exists idx_servers_client_id on public.servers using btree (client_id) TABLESPACE pg_default;

create trigger set_servers_user_id BEFORE INSERT on servers for EACH row
execute FUNCTION set_user_id ();