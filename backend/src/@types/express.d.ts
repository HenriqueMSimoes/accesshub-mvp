import "express";

export interface AuthUser {
  id: string;
  email: string | null;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
    accessToken?: string;
  }
}
