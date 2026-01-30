import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  getPortsByServer,
  createPort,
  updatePort,
  deletePort,
} from "../api/ports";

type Port = {
  id: string;
  server_id: string;
  port: number;
  protocol?: string;
  service?: string;
  notes?: string;
};

type PortForm = {
  port?: number;
  protocol?: string;
  service?: string;
  notes?: string;
};

export function Ports() {
  const { serverId } = useParams<{ serverId: string }>();
  const navigate = useNavigate();

  const [ports, setPorts] = useState<Port[]>([]);
  const [form, setForm] = useState<PortForm>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  async function loadPorts() {
    if (!serverId) return;
    const res = await getPortsByServer(serverId);
    setPorts(res.data);
  }

  useEffect(() => {
    loadPorts();
  }, [serverId]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      [e.target.name]:
        e.target.name === "port" ? Number(e.target.value) : e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!serverId) return;

    if (!form.port) {
      alert("Porta é obrigatória");
      return;
    }

    if (editingId) {
      await updatePort(editingId, form);
      setEditingId(null);
    } else {
      await createPort({
        server_id: serverId,
        port: form.port, // ✅ agora é number garantido
        protocol: form.protocol,
        service: form.service,
        notes: form.notes,
      });
    }

    setForm({});
    await loadPorts();
  }

  function handleEdit(port: Port) {
    setEditingId(port.id);
    setForm({
      port: port.port,
      protocol: port.protocol || "",
      service: port.service || "",
      notes: port.notes || "",
    });

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir porta?")) return;
    await deletePort(id);
    setPorts((prev) => prev.filter((p) => p.id !== id));
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm({});
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Ports</h1>

      <div ref={formRef}>
        <form onSubmit={handleSubmit}>
          <input
            name="port"
            type="number"
            placeholder="Porta"
            value={form.port || ""}
            onChange={handleChange}
            required
          />

          <input
            name="protocol"
            placeholder="Protocolo (TCP/UDP)"
            value={form.protocol || ""}
            onChange={handleChange}
          />

          <input
            name="service"
            placeholder="Serviço"
            value={form.service || ""}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Observações"
            value={form.notes || ""}
            onChange={handleChange}
          />

          <button type="submit">{editingId ? "Salvar" : "Criar"}</button>

          {editingId && (
            <button type="button" onClick={handleCancelEdit}>
              Cancelar
            </button>
          )}
        </form>
      </div>

      <ul>
        {ports.map((p) => (
          <li key={p.id}>
            {p.port} — {p.service}
            <button onClick={() => handleEdit(p)}>Editar</button>
            <button onClick={() => handleDelete(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate(-1)}>← Voltar</button>
    </div>
  );
}
