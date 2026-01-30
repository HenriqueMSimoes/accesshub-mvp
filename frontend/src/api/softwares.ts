import { api } from "./axios";

/**
 * GET /softwares/:server_id
 */
export function getSoftwaresByServer(serverId: string) {
  return api.get(`/softwares/server/${serverId}`);
}

/**
 * POST /softwares
 */
export function createSoftware(data: {
  server_id: string;
  name: string;
  version?: string;
  vendor?: string;
  notes?: string;
}) {
  return api.post("/softwares", data);
}

/**
 * PUT /softwares/:id
 */
export function updateSoftware(
  id: string,
  data: Partial<{
    name: string;
    version: string;
    vendor: string;
    notes: string;
  }>,
) {
  return api.put(`/softwares/${id}`, data);
}

/**
 * DELETE /softwares/:id
 */
export function deleteSoftware(id: string) {
  return api.delete(`/softwares/${id}`);
}
