import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { getSupabaseClient } from "../services/supabase";

export async function createServer(req: AuthRequest, res: Response) {
  const supabase = getSupabaseClient(
    req.headers.authorization!.split(" ")["1"],
  );

  const {
    client_id,
    name,
    host,
    environment,
    os,
    type,
    admin_user,
    admin_password,
    notes,
  } = req.body;

  const { data, error } = await supabase
    .from("servers")
    .insert([
      {
        client_id,
        name,
        host,
        environment,
        os,
        type,
        admin_user,
        admin_password,
        notes,
      },
    ])
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data);
}

export async function listServers(req: AuthRequest, res: Response) {
  const supabase = getSupabaseClient(
    req.headers.authorization!.split(" ")["1"],
  );

  const { data, error } = await supabase
    .from("servers")
    .select("*, clients(name)")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data);
}
