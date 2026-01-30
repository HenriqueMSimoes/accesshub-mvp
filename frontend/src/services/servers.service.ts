import { api } from "../api/axios";
import type { Server } from "../types/server";

export const getServers = async () => {
  const { data } = await api.get<Server[]>("/servers");
  return data;
};

export const createServer = async (payload: Partial<Server>) => {
  const { data } = await api.post("/servers", payload);
  return data;
};

export const updateServer = async (id: string, payload: Partial<Server>) => {
  const { data } = await api.put(`/servers/${id}`, payload);
  return data;
};

export const deleteServer = async (id: string) => {
  await api.delete(`/servers/${id}`);
};
