import { Request, Response, NextFunction } from "express";
import { getSupabaseClient } from "../lib/supabasePublic.js";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const supabase = getSupabaseClient(token);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = {
    id: user.id,
    email: user.email ?? null,
  };

  req.accessToken = token; // 👈 importante

  return next();
}
