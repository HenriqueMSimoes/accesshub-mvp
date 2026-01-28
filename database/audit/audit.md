1. LISTAR TODAS AS TABELAS CRIADAS (schema public)
SELECT
  schemaname,
  tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;


✔️ Confirma todas as tabelas existentes

🔐 2. VERIFICAR QUAIS TABELAS ESTÃO COM RLS ATIVADO
SELECT
  n.nspname  AS schema,
  c.relname  AS table,
  c.relrowsecurity AS rls_enabled,
  c.relforcerowsecurity AS rls_forced
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relkind = 'r'
ORDER BY c.relname;

🔎 Interpretação
Campo	Esperado
rls_enabled	true
rls_forced	false (normalmente)
📜 3. LISTAR TODAS AS POLICIES (RLS RULES)
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;


✔️ Aqui você confirma:

SELECT / INSERT / UPDATE / DELETE

TO authenticated

auth.uid() presente

🧠 4. VERIFICAR TABELAS SEM POLICY (PROBLEMA GRAVE)
SELECT
  c.relname AS table
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
LEFT JOIN pg_policies p ON p.tablename = c.relname
WHERE n.nspname = 'public'
  AND c.relkind = 'r'
GROUP BY c.relname
HAVING COUNT(p.policyname) = 0;


🚨 Se retornar algo → essas tabelas estão expostas ou inutilizáveis com RLS

⚙️ 5. LISTAR TRIGGERS (ex: auto user_id)
SELECT
  event_object_table AS table,
  trigger_name,
  action_timing,
  event_manipulation,
  action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table;


✔️ Confirma:

Triggers BEFORE INSERT

Funções corretas

🧩 6. VALIDAR SE TODAS AS TABELAS POSSUEM user_id
SELECT
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND column_name = 'user_id'
ORDER BY table_name;

🧪 7. TABELAS QUE DEVERIAM TER RLS MAS NÃO TÊM user_id
SELECT
  t.tablename
FROM pg_tables t
LEFT JOIN information_schema.columns c
  ON c.table_name = t.tablename
  AND c.column_name = 'user_id'
WHERE t.schemaname = 'public'
  AND c.column_name IS NULL;


🚨 Ideal para detectar tabelas que quebrariam o modelo multi-tenant

🧱 8. AUDITORIA COMPLETA (RESUMO)
SELECT
  c.relname AS table,
  c.relrowsecurity AS rls,
  COUNT(p.policyname) AS policies,
  BOOL_OR(p.cmd = 'SELECT') AS has_select,
  BOOL_OR(p.cmd = 'INSERT') AS has_insert,
  BOOL_OR(p.cmd = 'UPDATE') AS has_update,
  BOOL_OR(p.cmd = 'DELETE') AS has_delete
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
LEFT JOIN pg_policies p ON p.tablename = c.relname
WHERE n.nspname = 'public'
  AND c.relkind = 'r'
GROUP BY c.relname, c.relrowsecurity
ORDER BY c.relname;

✅ O que você quer ver

rls = true

policies >= 4

todos has_* = true