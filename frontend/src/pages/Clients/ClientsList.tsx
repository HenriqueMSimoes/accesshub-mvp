import { useEffect, useState } from "react";
import { getClients } from "../../api/clients";

import { createClient } from "../../api/clients";

export function ClientsList() {
  const [clients, setClients] = useState<any[]>([]);

  function handleCreate() {
    createClient({
      name: "Novo Cliente",
      contact: "email@testes.com",
    }).then(() => {
      getClients().then((res) => setClients(res.data));
    });
  }

  useEffect(() => {
    getClients().then((res) => setClients(res.data));
  }, []);

  return (
    <div>
      <h1>Clients</h1>
      <button onClick={handleCreate}>Novo Cliente</button>
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
