import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { getSupabaseClient } from "../services/supabase";

export async function createSoftware(req: AuthRequest, res: Response) {
  const supabase = getSupabaseClient(
    req.headers.authorization!.split(" ")[1],
  );

  const { server_id, name, type, version, main_port } = req.body;

  const { data, error } = await supabase
    .from("softwares")
    .insert([
      {
        server_id,
        name,
        type,
        version,
        main_port,
      },
    ])
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data);
}

export async function listSoftwares(req: AuthRequest, res: Response) {
  const supabase = getSupabaseClient(
    req.headers.authorization!.split(" ")[1],
  );

  const { data, error } = await supabase
    .from("softwares")
    .select("*, servers(name)");

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
}
