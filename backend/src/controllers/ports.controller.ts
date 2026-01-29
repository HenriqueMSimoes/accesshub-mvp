import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { getSupabaseClient } from "../services/supabase";

export async function createPort(req: AuthRequest, res: Response) {
  const supabase = getSupabaseClient(
    req.headers.authorization!.split(" ")["1"],
  );

  const { server_id, port, protocol, service, status } = req.body;

  const { data, error } = await supabase
    .from("ports")
    .insert([
      {
        server_id,
        port,
        protocol,
        service,
        status,
      },
    ])
    .select();

  if (error) {
    if (error.message.includes("duplicate")) {
      return res
        .status(400)
        .json({ error: "Port already exists for this server" });
    }

    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
}

export async function listPortsbyServer(req: AuthRequest, res: Response) {
  const supabase = getSupabaseClient(
    req.headers.authorization!.split(" ")["1"],
  );

  const { server_id } = req.params;

  const { data, error } = await supabase
    .from("ports")
    .select("*")
    .eq("server_id", server_id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data);
}
