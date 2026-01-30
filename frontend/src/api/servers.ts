import { api } from "./axios";

/**
 * GET /servers/:client_id
 * Lista servidores de um cliente
 */
export function getServersByClient(clientId: string) {
  return api.get(`/servers/${clientId}`);
}

/**
 * POST /servers
 */
export function createServer(data: {
  client_id: string;
  name?: string;
  host?: string;
  environment?: string;
  os?: string;
  type?: string;
  admin_user?: string;
  admin_password?: string;
  notes?: string;
}) {
  // console.log("API createServer data =>", data);
  return api.post("/servers", data);
}

/**
 * PUT /servers/:id
 */
export function updateServer(
  id: string,
  data: {
    client_id?: string;
    name?: string;
    host?: string;
    environment?: string;
    os?: string;
    type?: string;
    admin_user?: string;
    admin_password?: string;
    notes?: string;
  },
) {
  return api.put(`/servers/${id}`, data);
}

/**
 * DELETE /servers/:id
 */
export function deleteServer(id: string) {
  return api.delete(`/servers/${id}`);
}
