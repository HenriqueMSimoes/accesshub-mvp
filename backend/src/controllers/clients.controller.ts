import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { getSupabaseClient } from "../services/supabase";

/**
 * POST /clients
 */
export async function createClient(req: AuthRequest, res: Response) {
  const { name, document, contact, notes } = req.body;

  const supabase = getSupabaseClient(
    req.headers.authorization!.split(" ")[1]
  );

  const { data, error } = await supabase
    .from("clients")
    .insert([
      {
        name,
        document,
        contact,
        notes,
        user_id: req.user!.id, // auth.uid() no banco
      },
    ])
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data);
}

/**
 * GET /clients
 */
export async function listClients(req: AuthRequest, res: Response) {
  const supabase = getSupabaseClient(
    req.headers.authorization!.split(" ")[1]
  );

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
}
