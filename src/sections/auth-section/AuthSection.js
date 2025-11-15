"use client";

import { useState } from "react";
import SignUpForm from "@/forms/sign-up/SignUpForm";
import SignInForm from "@/forms/sign-in/SignInForm";

export default function AuthSection() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <section className="flex justify-center items-center w-full h-screen">
      {isSignIn ? (
        <SignInForm onToggle={toggleForm} />
      ) : (
        <SignUpForm onToggle={toggleForm} />
      )}
    </section>
  );
}
