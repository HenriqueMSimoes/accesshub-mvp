import { api } from "./axios";

/**
 * GET /ports/:server_id
 */
export function getPortsByServer(serverId: string) {
  return api.get(`/ports/${serverId}`);
}

/**
 * POST /ports
 */
export function createPort(data: {
  server_id: string;
  port: number;
  protocol?: string;
  service?: string;
  notes?: string;
}) {
  return api.post("/ports", data);
}

/**
 * PUT /ports/:id
 */
export function updatePort(
  id: string,
  data: Partial<{
    port: number;
    protocol: string;
    service: string;
    notes: string;
  }>,
) {
  return api.put(`/ports/${id}`, data);
}

/**
 * DELETE /ports/:id
 */
export function deletePort(id: string) {
  return api.delete(`/ports/${id}`);
}
