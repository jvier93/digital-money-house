import React from "react";
import { SignupForm } from "@/app/components/auth/signup-form";

const page = () => {
  return (
    <main className="bg-primary flex-1 space-y-6 py-8">
      <h1 className="heading-2 text-center text-white">Crear cuenta</h1>
      <SignupForm />
    </main>
  );
};

export default page;
