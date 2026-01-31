create table public.ports (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  server_id uuid not null,
  port integer not null,
  protocol text null,
  service text null,
  status text null,
  created_at timestamp with time zone null default now(),
  constraint ports_pkey primary key (id),
  constraint ports_server_id_port_key unique (server_id, port),
  constraint ports_server_fk foreign KEY (server_id) references servers (id) on delete CASCADE,
  constraint ports_user_fk foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_ports_user_id on public.ports using btree (user_id) TABLESPACE pg_default;

create index IF not exists idx_ports_server_id on public.ports using btree (server_id) TABLESPACE pg_default;

create trigger set_ports_user_id BEFORE INSERT on ports for EACH row
execute FUNCTION set_user_id ();