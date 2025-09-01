"use client";

import { useActionState, useEffect } from "react";
import { signupAction, SignupValues } from "@/actions";
import { InputField } from "@/components/auth/input-field";
import { useRouter } from "next/navigation";

export type SignUpFormStateType = {
  values: SignupValues;
  errors: Record<string, string>;
  success: boolean;
};

const initialState: SignUpFormStateType = {
  values: {
    firstName: "",
    lastName: "",
    dni: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  },
  errors: {},
  success: false,
};

export function SignupForm() {
  const [state, formAction] = useActionState(signupAction, initialState);
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      router.push("/"); // redirige cuando la acción fue exitosa
    }
  }, [state, router]);

  const fields = [
    { name: "firstName", label: "Nombre", type: "text" },
    { name: "lastName", label: "Apellido", type: "text" },
    { name: "dni", label: "DNI", type: "text" },
    { name: "email", label: "Correo electrónico", type: "email" },
    { name: "password", label: "Contraseña", type: "password" },
    {
      name: "confirmPassword",
      label: "Confirmar contraseña",
      type: "password",
    },
    { name: "phone", label: "Teléfono", type: "tel" },
  ];

  return (
    <form
      action={formAction}
      className="mx-auto grid max-w-3xl grid-cols-1 place-items-center gap-4 lg:grid-cols-2"
    >
      {fields.map(({ name, label, type }) => (
        <InputField
          key={name}
          name={name}
          label={label}
          type={type}
          value={state.values[name as keyof typeof state.values]}
          error={state.errors[name as keyof typeof state.errors]}
        />
      ))}
      {state.errors.api && <p className="text-error">{state.errors.api}</p>}
      <button
        type="submit"
        className="text-primary text-btn-2 bg-accent mt-2 w-80 rounded-lg px-6 py-3"
      >
        Crear cuenta
      </button>
    </form>
  );
}
