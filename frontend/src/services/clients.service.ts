import { api } from "./api";
import type { Client } from "../types/clients";

export const getClients = async () => {
  const { data } = await api.get<Client[]>("/clients");
  return data;
};

export const createClient = async (payload: Partial<Client>) => {
  const { data } = await api.post("/clients", payload);
  return data;
};

export const updateClient = async (id: string, payload: Partial<Client>) => {
  const { data } = await api.put(`/clients/${id}`, payload);
  return data;
};

export const deleteClient = async (id: string) => {
  await api.delete(`/clients/${id}`);
};
