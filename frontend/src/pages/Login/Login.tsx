import { useState } from "react";

export function Login() {
  const [token, setToken] = useState("");

  function handleLogin() {
    localStorage.setItem("token", token);
    window.location.href = "/";
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="Supabase JWT"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
