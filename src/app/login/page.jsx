"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginProgress, setLoginProgress] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoginProgress(true);
    await signIn("credentials", { email, password, callbackUrl: "/" });
    setLoginProgress(false);
  };
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginProgress}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginProgress}
        />
        <button disabled={loginProgress} type="submit">
          Login
        </button>
        <div className="my-4 text-center text-gray-500">or</div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <FcGoogle className="w-[24px] h-[24px]" />
          Login with Google
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
