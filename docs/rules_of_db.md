## Criar as regras

Para cada tabela criada

No Supbase -> SQL Editor

```SQL
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients: authenticated access"
ON clients
FOR ALL
USING (auth.uid() IS NOT NULL);
```

```SQL
ALTER TABLE servers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Servers: authenticated access"
ON servers
FOR ALL
USING (auth.uid() IS NOT NULL);
```

```SQL
ALTER TABLE ports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ports: authenticated access"
ON ports
FOR ALL
USING (auth.uid() IS NOT NULL);
```

```SQL
ALTER TABLE softwares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Softwares: authenticated access"
ON softwares
FOR ALL
USING (auth.uid() IS NOT NULL);
```

```SQL
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Links: authenticated access"
ON links
FOR ALL
USING (auth.uid() IS NOT NULL);
```