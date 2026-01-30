import { api } from "./axios";

/**
 * GET /clients
 */
export function getClients() {
  return api.get("/clients");
}

/**
 * POST /clients
 */
export function createClient(data: {
  name: string;
  document?: string;
  contact?: string;
  notes?: string;
}) {
  return api.post("/clients", data);
}

/**
 * PUT /clients/:id
 */
export function updateClient(
  id: string,
  data: {
    name?: string;
    document?: string;
    contact?: string;
    notes?: string;
  },
) {
  return api.put(`/clients/${id}`, data);
}

/**
 * DELETE /clients/:id
 */
export function deleteClient(id: string) {
  return api.delete(`/clients/${id}`);
}
