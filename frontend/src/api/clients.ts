import { api } from "./axios";

export function getClients() {
  return api.get("/clients");
}

export function createClient(data: any) {
  return api.post("/clients", data);
}
