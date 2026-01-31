## 5️⃣ Limpar tabelas no Supabase (SEM APAGAR)

### ⚠️ NÃO APAGUE AS TABELAS

Apenas **truncate**.

### 📌 No SQL Editor do Supabase:

```sql
TRUNCATE TABLE
  clients
RESTART IDENTITY CASCADE;

```

Se tiver mais tabelas no MVP:

```sql
TRUNCATE TABLE
  clients,
  servers,
  ports,
  softwares
RESTART IDENTITY CASCADE;

```

✔ Mantém:

- estrutura
- relacionamentos
- RLS
- policies

✔ Remove:

- dados de teste
- lixo de desenvolvimento

---
