import { api } from "../api/axios";
import type { Port } from "../types/port";

export const getPorts = async () => {
  const { data } = await api.get<Port[]>("/ports");
  return data;
};

export const createPort = async (payload: Partial<Port>) => {
  const { data } = await api.post("/ports", payload);
  return data;
};

export const updatePort = async (id: string, payload: Partial<Port>) => {
  const { data } = await api.put(`/ports/${id}`, payload);
  return data;
};

export const deletePort = async (id: string) => {
  await api.delete(`/ports/${id}`);
};
