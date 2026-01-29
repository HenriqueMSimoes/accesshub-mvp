export interface Server {
  client_id: string;
  name: string;
  host?: string;
  environment?: string;
  os?: string;
  type?: string;
  admin_user?: string;
  admin_password?: string;
  notes?: string;
}
