import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function LogoutButton() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return <button onClick={handleLogout}>Sair</button>;
}
