import { Request, Response, NextFunction } from "express";
import { getSupabaseClient } from "../lib/supabasePublic";

export interface AuthUser {
  id: string;
  email: string | null;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const token = authHeader.split(" ")[1];

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

  return next();
}
