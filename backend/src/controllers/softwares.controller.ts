import { Request, Response } from "express";
import { getSupabaseClient } from "../lib/supabasePublic";

/**
 * POST /softwares
 */
export async function createSoftware(req: Request, res: Response) {
  if (!req.user || !req.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { server_id, name, type, version, main_port } = req.body;

  if (!server_id || !name) {
    return res.status(400).json({ error: "server_id e name são obrigatórios" });
  }

  const supabase = getSupabaseClient(req.accessToken);

  const { data, error } = await supabase
    .from("softwares")
    .insert([
      {
        server_id,
        name,
        type,
        version,
        main_port,
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
 * GET /softwares
 * Lista geral de softwares
 */
export async function listSoftwares(req: Request, res: Response) {
  if (!req.user || !req.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const supabase = getSupabaseClient(req.accessToken);

  const { data, error } = await supabase
    .from("softwares")
    .select("*, servers(name)");

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
}

/**
 * GET /softwares/:server_id
 * Lista de softwares por servidor
 */
export async function listSoftwaresByServer(req: Request, res: Response) {
  if (!req.user || !req.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { server_id } = req.params;

  if (!server_id) {
    return res.status(400).json({ error: "server_id é obrigatório" });
  }

  const supabase = getSupabaseClient(req.accessToken);

  const { data, error } = await supabase
    .from("softwares")
    .select("*")
    .eq("server_id", server_id)
    .order("name");

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
}

/**
 * PUT /softwares/:id
 */
export async function updateSoftware(req: Request, res: Response) {
  if (!req.user || !req.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params;
  const { server_id, name, type, version, main_port } = req.body;

  const supabase = getSupabaseClient(req.accessToken);

  const updateData: {
    server_id?: string;
    name?: string;
    type?: string;
    version?: string;
    main_port?: number;
  } = {};

  if (server_id !== undefined) updateData.server_id = server_id;
  if (name !== undefined) updateData.name = name;
  if (type !== undefined) updateData.type = type;
  if (version !== undefined) updateData.version = version;
  if (main_port !== undefined) updateData.main_port = main_port;

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "Nenhum campo para atualizar" });
  }

  const { data, error } = await supabase
    .from("softwares")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
}

/**
 * DELETE /softwares/:id
 */
export async function deleteSoftware(req: Request, res: Response) {
  if (!req.user || !req.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params;

  const supabase = getSupabaseClient(req.accessToken);

  const { error } = await supabase
    .from("softwares")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(204).send();
}
