import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  getSoftwaresByServer,
  createSoftware,
  updateSoftware,
  deleteSoftware,
} from "../api/softwares";

type Software = {
  id: string;
  server_id: string;
  name: string;
  version?: string;
  vendor?: string;
  notes?: string;
};

export function Softwares() {
  const { serverId } = useParams<{ serverId: string }>();
  const navigate = useNavigate();

  const [softwares, setSoftwares] = useState<Software[]>([]);
  const [form, setForm] = useState<Partial<Software>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  async function loadSoftwares() {
    if (!serverId) return;
    const res = await getSoftwaresByServer(serverId);
    setSoftwares(res.data);
  }

  useEffect(() => {
    loadSoftwares();
  }, [serverId]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!serverId) return;

    if (editingId) {
      await updateSoftware(editingId, form);
      setEditingId(null);
    } else {
      await createSoftware({ ...form, server_id: serverId } as any);
    }

    setForm({});
    await loadSoftwares();
  }

  function handleEdit(software: Software) {
    setEditingId(software.id);

    setForm({
      name: software.name,
      version: software.version || "",
      vendor: software.vendor || "",
      notes: software.notes || "",
    });

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Deseja realmente excluir este software?");
    if (!confirmDelete) return;

    await deleteSoftware(id);

    setSoftwares((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Softwares</h1>

      <div ref={formRef}>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nome"
            value={form.name || ""}
            onChange={handleChange}
            required
          />

          <input
            name="version"
            placeholder="Versão"
            value={form.version || ""}
            onChange={handleChange}
          />

          <input
            name="vendor"
            placeholder="Fabricante"
            value={form.vendor || ""}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Observações"
            value={form.notes || ""}
            onChange={handleChange}
          />

          <button type="submit">{editingId ? "Salvar" : "Criar"}</button>
        </form>
      </div>

      <ul>
        {softwares.map((s) => (
          <li key={s.id}>
            {s.name} {s.version && `(${s.version})`}
            <button onClick={() => handleEdit(s)}>Editar</button>
            <button onClick={() => handleDelete(s.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate(-1)}>← Voltar</button>
    </div>
  );
}
