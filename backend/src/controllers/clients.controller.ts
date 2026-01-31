import { Request, Response } from "express";
import { getSupabaseClient } from "../lib/supabasePublic.js";

/**
 * POST /clients
 */
export async function createClient(req: Request, res: Response) {
  if (!req.user || !req.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { name, document, contact, notes } = req.body;

  const supabase = getSupabaseClient(req.accessToken);

  const { data, error } = await supabase
    .from("clients")
    .insert([
      {
        name,
        document,
        contact,
        notes,
        user_id: req.user.id,
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
export async function listClients(req: Request, res: Response) {
  if (!req.user || !req.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const supabase = getSupabaseClient(req.accessToken);

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
export async function updateClient(req: Request, res: Response) {
  if (!req.user || !req.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params;
  const { name, document, contact, notes } = req.body;

  const supabase = getSupabaseClient(req.accessToken);

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
export async function deleteClient(req: Request, res: Response) {
  if (!req.user || !req.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params;

  const supabase = getSupabaseClient(req.accessToken);

  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(204).send();
}
