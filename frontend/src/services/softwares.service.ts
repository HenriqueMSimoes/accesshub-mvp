import { api } from "./api";
import type { Software } from "../types/softwares";

export const getSoftwares = async () => {
  const { data } = await api.get<Software[]>("/softwares");
  return data;
};

export const createSoftware = async (payload: Partial<Software>) => {
  const { data } = await api.post("/softwares", payload);
  return data;
};

export const updateSoftware = async (
  id: string,
  payload: Partial<Software>,
) => {
  const { data } = await api.put(`/softwares/${id}`, payload);
  return data;
};

export const deleteSoftware = async (id: string) => {
  await api.delete(`/softwares/${id}`);
};
