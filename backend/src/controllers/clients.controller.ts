import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { getSupabaseClient } from "../lib/supabasePublic";

/**
 * POST /clients
 */
export async function createClient(req: AuthRequest, res: Response) {
  const { name, document, contact, notes } = req.body;

  const supabase = getSupabaseClient(req.headers.authorization!.split(" ")[1]);

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
  const supabase = getSupabaseClient(req.headers.authorization!.split(" ")[1]);

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
}

/**
 * PUT /clients/:id
 */
export async function updateClient(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { name, document, contact, notes } = req.body;

  const supabase = getSupabaseClient(req.headers.authorization!.split(" ")[1]);

  const updateData: {
    name?: string;
    document?: string;
    contact?: string;
    notes?: string;
  } = {};

  if (name !== undefined) updateData.name = name;
  if (document !== undefined) updateData.document = document;
  if (contact !== undefined) updateData.contact = contact;
  if (notes !== undefined) updateData.notes = notes;

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "Nenhum campo para atualizar" });
  }

  const { data, error } = await supabase
    .from("clients")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
}

/**
 * DELETE /clients/:id
 */
export async function deleteClient(req: AuthRequest, res: Response) {
  const { id } = req.params;

  const supabase = getSupabaseClient(req.headers.authorization!.split(" ")[1]);

  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user!.id); // só o dono apaga

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(204).send();
}
