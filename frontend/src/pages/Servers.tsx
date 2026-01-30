import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState, useRef } from "react";
import { getClients } from "../api/clients";
import {
  getServersByClient,
  createServer,
  updateServer,
  deleteServer,
} from "../api/servers";

type Client = {
  id: string;
  name: string;
};

type Server = {
  id: string;
  client_id: string;
  name?: string;
  host?: string;
  environment?: string;
  os?: string;
  type?: string;
  admin_user?: string;
  admin_password?: string;
  notes?: string;
};

type ServerForm = {
  name?: string;
  host?: string;
  environment?: string;
  os?: string;
  type?: string;
  admin_user?: string;
  admin_password?: string;
  notes?: string;
};

export function Servers() {
  const [clients, setClients] = useState<Client[]>([]);
  const [servers, setServers] = useState<Server[]>([]);

  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();

  const selectedClientId = clientId!;

  const [form, setForm] = useState<ServerForm>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  async function loadClients() {
    const res = await getClients();
    setClients(res.data);
  }

  async function loadServers(clientId: string) {
    const res = await getServersByClient(clientId);
    // console.log("SERVERS:", res.data);
    setServers(res.data);
  }

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    if (clientId) {
      loadServers(clientId);
    } else {
      setServers([]);
    }
  }, [clientId]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedClientId) {
      return alert("Selecione um cliente");
    }

    setLoading(true);

    try {
      if (editingId) {
        await updateServer(editingId, form);
        setEditingId(null);
      } else {
        // console.log("SUBMIT SERVER", { selectedClientId, form });

        // ⭐ Recomendado: colocar client_id por último evita o form sobrescrever
        // (caso exista form.client_id vazio por engano)
        await createServer({
          ...form,
          client_id: selectedClientId,
        });
      }

      setForm({
        name: "",
        host: "",
        environment: "",
        os: "",
        type: "",
        admin_user: "",
        admin_password: "",
        notes: "",
      });

      await loadServers(selectedClientId);
    } catch (err: any) {
      // console.error("CREATE SERVER ERROR:", err?.response?.data || err);
      alert(err?.response?.data?.error || "Erro ao criar servidor");
    } finally {
      setLoading(false);
    }
  }

  /**? Daqui esta normal */
  function handleEdit(server: Server) {
    setEditingId(server.id);
    setForm({
      name: server.name || "",
      host: server.host || "",
      environment: server.environment || "",
      os: server.os || "",
      type: server.type || "",
      admin_user: server.admin_user || "",
      admin_password: server.admin_password || "",
      notes: server.notes || "",
    });

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Deseja realmente excluir este servidor?");
    if (!confirmDelete) return;

    await deleteServer(id);
    setServers((prev) => prev.filter((s) => s.id !== id));
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm({});
  }

  return (
    <div style={{ padding: 24, maxWidth: 700 }}>
      <h1>Servidores</h1>

      {selectedClientId && (
        <>
          <hr />

          {/* FORM */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
              <h3 style={{ color: editingId ? "orange" : "black" }}>
                {editingId ? "Editar Servidor" : "Novo Servidor"}
              </h3>

              <input
                name="name"
                placeholder="Nome"
                value={form.name || ""}
                onChange={handleChange}
                autoFocus={!!editingId}
                required
              />

              <input
                name="host"
                placeholder="Host / IP"
                value={form.host || ""}
                onChange={handleChange}
                required
              />

              <input
                name="environment"
                placeholder="Ambiente (prod, dev...)"
                value={form.environment || ""}
                onChange={handleChange}
              />

              <input
                name="os"
                placeholder="Sistema Operacional"
                value={form.os || ""}
                onChange={handleChange}
              />

              <input
                name="type"
                placeholder="Tipo (VM, Bare Metal...)"
                value={form.type || ""}
                onChange={handleChange}
              />

              <input
                name="admin_user"
                placeholder="Usuário admin"
                value={form.admin_user || ""}
                onChange={handleChange}
              />

              <input
                name="admin_password"
                placeholder="Senha admin"
                type="password"
                value={form.admin_password || ""}
                onChange={handleChange}
              />

              <textarea
                name="notes"
                placeholder="Observações"
                value={form.notes || ""}
                onChange={handleChange}
              />

              <div style={{ marginTop: 8 }}>
                <button type="submit" disabled={loading}>
                  {editingId ? "Salvar Alterações" : "Criar Servidor"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    style={{ marginLeft: 8 }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <hr />

          {/* LISTA */}
          {servers.length === 0 ? (
            <p>Nenhum servidor para este cliente.</p>
          ) : (
            <ul>
              {servers.map((server) => (
                // <li key={server.id} style={{ marginBottom: 12 }}>
                //   <strong>{server.name || "Servidor sem nome"}</strong>
                //   {server.host && <> — {server.host}</>}

                //   <div>
                //     <button onClick={() => handleEdit(server)}>Editar</button>
                //     <button
                //       onClick={() => handleDelete(server.id)}
                //       style={{ marginLeft: 8 }}
                //     >
                //       Excluir
                //     </button>
                //   </div>
                // </li>
                <li key={server.id} style={{ marginBottom: 12 }}>
                  {server.id && <> — {server.id}</>}
                  <strong>{server.name || "Servidor sem nome"}</strong>
                  {server.host && <> — {server.host}</>}

                  <div style={{ marginTop: 4 }}>
                    <button onClick={() => handleEdit(server)}>Editar</button>

                    <button
                      onClick={() => navigate(`/servers/${server.id}/ports`)}
                      style={{ marginLeft: 8 }}
                    >
                      Ports
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/servers/${server.id}/softwares`)
                      }
                      style={{ marginLeft: 8 }}
                    >
                      Softwares
                    </button>

                    <button
                      onClick={() => handleDelete(server.id)}
                      style={{ marginLeft: 8 }}
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <button onClick={() => navigate("/")}>← Voltar para Clientes</button>
    </div>
  );
}
