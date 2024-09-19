"use client";

import useLogin from "@/hooks/useLogin";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="text-verde-400">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loginMutation.status === "pending"}>
        {loginMutation.status === "pending" ? "Logging in..." : "Login"}
      </button>
      {loginMutation.isError && <p>Login failed. Please try again.</p>}
    </form>
  );
};

export default LoginPage;
