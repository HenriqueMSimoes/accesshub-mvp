create table public.softwares (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  server_id uuid not null,
  name text null,
  type text null,
  version text null,
  main_port integer null,
  constraint softwares_pkey primary key (id),
  constraint softwares_server_fk foreign KEY (server_id) references servers (id) on delete CASCADE,
  constraint softwares_user_fk foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_softwares_user_id on public.softwares using btree (user_id) TABLESPACE pg_default;

create index IF not exists idx_softwares_server_id on public.softwares using btree (server_id) TABLESPACE pg_default;

create trigger set_softwares_user_id BEFORE INSERT on softwares for EACH row
execute FUNCTION set_user_id ();