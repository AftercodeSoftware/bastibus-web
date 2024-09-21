"use client";

import { FormEvent, useRef } from "react";

const Home = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });

    // Handle response if necessary
    const { user } = await response.json();
  }

  return (
    <form onSubmit={onSubmit} className="text-verde-400">
      <input
        ref={emailRef}
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        ref={passwordRef}
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <button type="submit">Log in</button>
    </form>
  );
};

export default Home;
