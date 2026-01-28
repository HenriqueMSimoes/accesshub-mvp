import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function Dashboard() {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    async function loadClients() {
      const session = await supabase.auth.getSession();

      const res = await fetch(`${import.meta.env.VITE_API_URL}/clients`, {
        headers: {
          Authorization: `Bearer ${session.data.session?.access_token}`,
        },
      });

      const data = await res.json();
      setClients(data);
    }

    loadClients();
  }, []);

  return (
    <div className={"p-6"}>
      <h1 className={"mb-4 text-xl font-bold"}>Clientes</h1>

      <ul className={"space-y-2"}>
        {clients.map((client) => (
          <li key={client.id} className={"rounded border p-2"}>
            {client.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
