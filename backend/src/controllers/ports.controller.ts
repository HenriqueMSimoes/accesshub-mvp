import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { getSupabaseClient } from "../lib/supabasePublic";

/**
 * POST /ports
 */
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

/**
 * GET /ports
 */
/**
 * GET /ports/:server_id
 */
export async function listPortsbyServer(req: AuthRequest, res: Response) {
  const supabase = getSupabaseClient(req.headers.authorization!.split(" ")[1]);

  const { server_id } = req.params;

  if (!server_id) {
    return res.status(400).json({ error: "server_id é obrigatório" });
  }

  const { data, error } = await supabase
    .from("ports")
    .select("*")
    .eq("server_id", server_id)
    .order("port", { ascending: true });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
}

/**
 * PUT /ports/:id
 */
export async function updatePort(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { port, protocol, service, status } = req.body;

  const supabase = getSupabaseClient(req.headers.authorization!.split(" ")[1]);

  // ✅ objeto de update parcial
  const updateData: {
    port?: number;
    protocol?: string;
    service?: string;
    status?: string;
  } = {};

  if (port !== undefined) updateData.port = port;
  if (protocol !== undefined) updateData.protocol = protocol;
  if (service !== undefined) updateData.service = service;
  if (status !== undefined) updateData.status = status;

  // opcional: evita update vazio
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "Nenhum campo para atualizar" });
  }

  const { data, error } = await supabase
    .from("ports")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
}

/**
 * DELETE /ports/:id
 */
export async function deletePort(req: AuthRequest, res: Response) {
  const { id } = req.params;

  const supabase = getSupabaseClient(req.headers.authorization!.split(" ")[1]);

  const { error } = await supabase.from("ports").delete().eq("id", id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(204).send();
}
