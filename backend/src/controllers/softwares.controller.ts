import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { getSupabaseClient } from "../services/supabase";

/**
 * POST /softwares
 */
export async function createSoftware(req: AuthRequest, res: Response) {
  const supabase = getSupabaseClient(req.headers.authorization!.split(" ")[1]);

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

/**
 * GET /softwares
 * Lista Geral de Softwares
 */
export async function listSoftwares(req: AuthRequest, res: Response) {
  const supabase = getSupabaseClient(req.headers.authorization!.split(" ")[1]);

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
 * Lista de Softwares por servidor
 */
export async function listSoftwaresByServer(req: AuthRequest, res: Response) {
  const supabase = getSupabaseClient(req.headers.authorization!.split(" ")[1]);

  const { server_id } = req.params;

  if (!server_id) {
    return res.status(400).json({ error: "server_id é obrigatório" });
  }

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
export async function updateSoftware(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { server_id, name, type, version, main_port } = req.body;

  const supabase = getSupabaseClient(req.headers.authorization!.split(" ")[1]);

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
export async function deleteSoftware(req: AuthRequest, res: Response) {
  const { id } = req.params;

  const supabase = getSupabaseClient(req.headers.authorization!.split(" ")[1]);

  const { error } = await supabase
    .from("softwares")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user!.id); // só o dono apaga

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(204).send();
}
