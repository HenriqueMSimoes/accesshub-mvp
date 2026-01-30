import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../api/clients";

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
            <li key={client.id} style={{ marginBottom: 12 }}>
              {client.id && <> — {client.id}</>}
              <strong>{client.name}</strong>
              {client.contact && <> — {client.contact}</>}

              <div>
                <button onClick={() => handleEdit(client)}>Editar</button>
                <button
                  onClick={() => handleDelete(client.id)}
                  style={{ marginLeft: 8 }}
                >
                  Excluir
                </button>
                <button
                  onClick={() => navigate(`/clients/${client.id}/servers`)}
                  style={{ marginLeft: 8 }}
                >
                  Servidores
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
