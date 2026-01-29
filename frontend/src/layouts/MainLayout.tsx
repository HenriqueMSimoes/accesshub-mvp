import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface Props {
  children: ReactNode;
}

export function MainLayout({ children }: Props) {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 200, background: "#eee", padding: 16 }}>
        <h3>AccessHub</h3>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <a href="/">Clients</a>
        </nav>

        <button onClick={handleLogout} style={{ marginTop: 16 }}>
          Sair
        </button>
      </aside>

      <main style={{ flex: 1, padding: 24 }}>{children}</main>
    </div>
  );
}
