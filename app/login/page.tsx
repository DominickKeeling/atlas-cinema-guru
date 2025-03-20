"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  const handleSignIn = () => {
    console.log("Attempting to sign in with GitHub");
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Atlas Cinema Guru</h1>
      <p>Please sign in to continue</p>
      <button onClick={handleSignIn}>
        Sign in with GitHub
      </button>
    </div>
  );
}
