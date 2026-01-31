create table public.clients (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  name text not null,
  document text null,
  contact text null,
  notes text null,
  created_at timestamp with time zone null default now(),
  constraint clients_pkey primary key (id),
  constraint clients_user_fk foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_clients_user_id on public.clients using btree (user_id) TABLESPACE pg_default;

create trigger set_clients_user_id BEFORE INSERT on clients for EACH row
execute FUNCTION set_user_id ();
