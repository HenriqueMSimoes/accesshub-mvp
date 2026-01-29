import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function MainLayout({ children }: Props) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 200, background: "#eee", padding: 16 }}>
        <h3>AccessHub</h3>
        <nav>
          <a href="/">Clients</a>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 24 }}>{children}</main>
    </div>
  );
}
