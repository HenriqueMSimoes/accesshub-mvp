import { useEffect, useState } from "react";
import { getClients } from "../../api/clients";

export function ClientsList() {
  const [clients, setClientes] = useState<any[]>([]);

  useEffect(() => {
    getClients().then((res) => setClientes(res.data));
  }, []);

  return (
    <div>
      <h1>Clients</h1>

      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} - {client.contact}
          </li>
        ))}
      </ul>
    </div>
  );
}
