import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../api/clients";

// Melhoria da página
import { getServersByClient } from "../api/servers";
import { getSoftwaresByServer } from "../api/softwares";
import { getPortsByServer } from "../api/ports";

type Client = {
  id: string;
  name: string;
  document?: string;
  contact?: string;
  notes?: string;
};

type ClientForm = {
  name: string;
  document?: string;
  contact?: string;
  notes?: string;
};

export function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  // Melhoria da página
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [servers, setServers] = useState<any[]>([]);
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
  const [softwares, setSoftwares] = useState<any[]>([]);
  const [portsServerId, setPortsServerId] = useState<string | null>(null);
  const [ports, setPorts] = useState<any[]>([]);
  const [loadingPorts, setLoadingPorts] = useState(false);
  useEffect(() => {
    if (!portsServerId) setPorts([]);
  }, [portsServerId]);

  const formRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const [form, setForm] = useState<ClientForm>({
    name: "",
    contact: "",
    document: "",
    notes: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadClients() {
    const res = await getClients();
    setClients(res.data);
  }

  useEffect(() => {
    loadClients();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return alert("Nome é obrigatório");

    setLoading(true);

    if (editingId) {
      await updateClient(editingId, form);
      setEditingId(null);
    } else {
      await createClient(form);
    }

    setForm({ name: "", contact: "", document: "", notes: "" });
    await loadClients();
    setLoading(false);
  }

  function handleEdit(client: Client) {
    setEditingId(client.id);
    setForm({
      name: client.name,
      contact: client.contact || "",
      document: client.document || "",
      notes: client.notes || "",
    });

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Deseja realmente excluir este cliente?");
    if (!confirmDelete) return;

    await deleteClient(id);
    setClients((prev) => prev.filter((c) => c.id !== id));
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm({ name: "", contact: "", document: "", notes: "" });
  }

  // Melhoria da página
  async function handleSelectClient(clientId: string) {
    if (clientId === selectedClientId) {
      setSelectedClientId(null);
      setServers([]);
      return;
    }

    setSelectedClientId(clientId);
    setSelectedServerId(null);
    setSoftwares([]);

    const res = await getServersByClient(clientId);
    setServers(res.data);
  }

  async function handleSelectServer(serverId: string) {
    if (serverId === selectedServerId) {
      setSelectedServerId(null);
      setSoftwares([]);
      return;
    }

    setSelectedServerId(serverId);

    const res = await getSoftwaresByServer(serverId);
    setSoftwares(res.data);
  }

  async function handleOpenPorts(serverId: string) {
    setPortsServerId(serverId);
    setLoadingPorts(true);

    try {
      const res = await getPortsByServer(serverId);
      setPorts(res.data);
    } finally {
      setLoadingPorts(false);
    }
  }

  function handleClosePorts() {
    setPortsServerId(null);
    setPorts([]);
  }

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <h1>Clientes</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <h3 style={{ color: editingId ? "orange" : "black" }}>
          {editingId ? "Editar Cliente" : "Novo Cliente"}
        </h3>

        <input
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
          autoFocus={!!editingId}
        />

        <input
          name="contact"
          placeholder="Contato"
          value={form.contact}
          onChange={handleChange}
        />

        <input
          name="document"
          placeholder="Documento"
          value={form.document}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Observações"
          value={form.notes}
          onChange={handleChange}
        />

        <div style={{ marginTop: 8 }}>
          <button type="submit" disabled={loading}>
            {editingId ? "Salvar Alterações" : "Criar Cliente"}
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

      <hr />

      {/* LISTA */}
      {clients.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client.id} style={{ marginBottom: 16 }}>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 8,
                }}
                onClick={() => handleSelectClient(client.id)}
              >
                {/* DADOS DO CLIENTE */}
                <div>
                  <strong>{client.name}</strong>
                  {client.contact && <> — {client.contact}</>}
                  {client.notes && <> — {client.notes}</>}
                </div>

                {/* BOTÕES */}
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(client);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(client.id);
                    }}
                    style={{ marginLeft: 8 }}
                  >
                    Excluir
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/clients/${client.id}/servers`);
                    }}
                    style={{ marginLeft: 8 }}
                  >
                    Servidores
                  </button>
                </div>
              </div>

              {/* SERVIDORES */}
              {selectedClientId === client.id && (
                <div style={{ marginLeft: 16, marginTop: 8 }}>
                  <h4>Servidores</h4>

                  {servers.length === 0 ? (
                    <p>Nenhum servidor cadastrado.</p>
                  ) : (
                    <ul>
                      {servers.map((server) => (
                        <li key={server.id} style={{ marginBottom: 8 }}>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSelectServer(server.id)}
                          >
                            <strong>{server.name}</strong> — {server.host} —{" "}
                            {server.environment} — {server.admin_user} —{" "}
                            {server.admin_password}
                            <button
                              style={{ marginLeft: 8 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenPorts(server.id);
                              }}
                            >
                              Portas
                            </button>
                          </div>

                          {/* SOFTWARES */}
                          {selectedServerId === server.id && (
                            <div style={{ marginLeft: 16, marginTop: 6 }}>
                              <h5>Softwares</h5>

                              {softwares.length === 0 ? (
                                <p>Nenhum software cadastrado.</p>
                              ) : (
                                <ul>
                                  {softwares.map((software) => (
                                    <li key={software.id}>
                                      <strong>{software.name}</strong>
                                      {software.notes && (
                                        <> — {software.notes}</>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      {portsServerId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={handleClosePorts}
        >
          <div
            style={{
              background: "#fff",
              padding: 24,
              minWidth: 420,
              maxHeight: "80vh",
              overflowY: "auto",
              borderRadius: 6,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <h3>Portas do Servidor</h3>
              <button onClick={handleClosePorts}>✕</button>
            </div>

            {loadingPorts ? (
              <p>Carregando portas...</p>
            ) : ports.length === 0 ? (
              <p>Nenhuma porta cadastrada.</p>
            ) : (
              <ul>
                {ports.map((port) => (
                  <li key={port.id}>
                    <strong>{port.number}</strong>
                    {port.protocol && <> — {port.protocol}</>}
                    {port.description && <> — {port.description}</>}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {portsServerId && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
              onClick={handleClosePorts}
            >
              <div
                style={{
                  background: "#fff",
                  padding: 24,
                  minWidth: 420,
                  maxHeight: "80vh",
                  overflowY: "auto",
                  borderRadius: 6,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <h3>Portas do Servidor</h3>
                  <button onClick={handleClosePorts}>✕</button>
                </div>

                {loadingPorts ? (
                  <p>Carregando portas...</p>
                ) : ports.length === 0 ? (
                  <p>Nenhuma porta cadastrada.</p>
                ) : (
                  <ul>
                    {ports.map((port) => (
                      <li key={port.id}>
                        <strong>{port.port}</strong>
                        {port.protocol && <> — {port.protocol}</>}
                        {port.description && <> — {port.description}</>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
