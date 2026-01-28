import { Request, Response } from "express";
import { supabase } from "../services/supabase";

export async function createClient(req: Request, res: Response) {
  const { name, document, contact, notes } = req.body;

  const { data, error } = await supabase.from("clients").insert([
    { name, document, contact, notes },
  ]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data);
}

export async function listClients(_: Request, res: Response) {
  const { data, error } = await supabase.from("clients").select("*");

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
}
