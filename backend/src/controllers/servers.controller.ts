import { Request, Response } from "express";
import { getSupabaseClient } from "../lib/supabasePublic.js";

/**
 * POST /servers
 */
export async function createServer(req: Request, res: Response) {
  if (!req.user || !req.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

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

  if (!client_id) {
    return res.status(400).json({ error: "client_id é obrigatório" });
  }

  const supabase = getSupabaseClient(req.accessToken);

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
 * GET /servers/:client_id
 */
export async function listServersByClient(req: Request, res: Response) {
  if (!req.user || !req.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { client_id } = req.params;

  if (!client_id) {
    return res.status(400).json({ error: "client_id é obrigatório" });
  }

  const supabase = getSupabaseClient(req.accessToken);

  const { data, error } = await supabase
    .from("servers")
    .select("*")
    .eq("client_id", client_id)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
}

/**
 * PUT /servers/:id
 */
export async function updateServer(req: Request, res: Response) {
  if (!req.user || !req.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params;

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

  const supabase = getSupabaseClient(req.accessToken);

  const updateData: {
    client_id?: string;
    name?: string;
    host?: string;
    environment?: string;
    os?: string;
    type?: string;
    admin_user?: string;
    admin_password?: string;
    notes?: string;
  } = {};

  if (client_id !== undefined) updateData.client_id = client_id;
  if (name !== undefined) updateData.name = name;
  if (host !== undefined) updateData.host = host;
  if (environment !== undefined) updateData.environment = environment;
  if (os !== undefined) updateData.os = os;
  if (type !== undefined) updateData.type = type;
  if (admin_user !== undefined) updateData.admin_user = admin_user;
  if (admin_password !== undefined) updateData.admin_password = admin_password;
  if (notes !== undefined) updateData.notes = notes;

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "Nenhum campo para atualizar" });
  }

  const { data, error } = await supabase
    .from("servers")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
}

/**
 * DELETE /servers/:id
 */
export async function deleteServer(req: Request, res: Response) {
  if (!req.user || !req.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params;

  const supabase = getSupabaseClient(req.accessToken);

  const { error } = await supabase
    .from("servers")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(204).send();
}
