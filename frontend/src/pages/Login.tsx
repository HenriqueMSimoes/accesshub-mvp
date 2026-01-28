import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signIn(email, password);
      // não navega aqui ainda
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // 🔥 quando o user existir → vai para o dashboard
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 space-y-4 rounded bg-white p-6 shadow"
      >
        <h1 className="text-xl font-bold">AccessHub</h1>

        {error && (
          <p className="rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>
        )}

        <input
          type="email"
          className="w-full border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full border p-2"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-black p-2 text-white disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
