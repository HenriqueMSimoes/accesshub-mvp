import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signIn(email, password);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 space-y-4 rounded bg-white p-6 shadow"
      >
        <h1 className={"text-xl font-bold"}>AccessHub</h1>

        <input
          className={"w-full border p-2"}
          placeholder={"Email"}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={"w-full border p-2"}
          type={"password"}
          placeholder={"Password"}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={"w-full bg-black p-2 text-white"}>Entrar</button>
      </form>
    </div>
  );
}
