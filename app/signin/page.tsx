"use client";

import { useState, Suspense } from "react";
import { UncontrolledInputField } from "@/components/auth/uncontrolled-input-field";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function SignInForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(
    searchParams.get("error")
      ? "Credenciales incorrectas, inténtalo nuevamente."
      : "",
  );

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get("email") as string;

    if (!emailValue) {
      setError("El email es obligatorio");
      return;
    }

    setError("");
    setEmail(emailValue);
    setStep("password");
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    if (!password) {
      setError("La contraseña es obligatoria");
      return;
    }

    setError("");

    await signIn("credentials", {
      redirectTo: "/dashboard",
      email,
      password,
    });
  };

  return (
    <>
      <h2 className="heading-2 mb-6 text-white">
        {step === "email"
          ? "¡Hola! Ingresá tu e-mail"
          : "Ingresa tu contraseña"}
      </h2>

      {step === "email" && (
        <form
          onSubmit={handleEmailSubmit}
          className="flex flex-col items-center gap-4"
        >
          <UncontrolledInputField
            name="email"
            label="Correo electrónico"
            type="email"
            value={email}
            error={error}
          />
          <button
            type="submit"
            className="text-primary text-btn-2 bg-accent block w-80 rounded-lg px-6 py-3 text-center"
          >
            Continuar
          </button>
        </form>
      )}

      {step === "password" && (
        <form
          onSubmit={handlePasswordSubmit}
          className="flex flex-col items-center gap-4"
        >
          <UncontrolledInputField
            name="password"
            label="Contraseña"
            type="password"
            error={error}
          />
          <button
            type="submit"
            className="text-primary btn-2 bg-accent block w-80 rounded-lg px-6 py-3 text-center"
          >
            Ingresar
          </button>
        </form>
      )}
    </>
  );
}

export default function SignInPage() {
  return (
    <main className="bg-primary flex flex-1 flex-col items-center justify-center">
      <Suspense fallback={<div>Cargando...</div>}>
        <SignInForm />
      </Suspense>
    </main>
  );
}
