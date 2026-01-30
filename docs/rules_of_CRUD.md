1️⃣ REGRA PADRÃO (GUARDA ISSO)

Para qualquer entidade (clients, servers, ports, softwares):

🔹 POST

Valida campos obrigatórios

Faz .insert()

Nunca usa .eq(user_id) → segurança é RLS

🔹 GET

Nunca assume param existente

Valida req.params

Apenas .select()

🔹 PUT

Update parcial

Cria updateData

Ignora campos undefined

Bloqueia update vazio

Nunca sobrescreve NOT NULL

🔹 DELETE

Apenas .delete().eq("id", id)

Segurança via RLS
