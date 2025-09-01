"use server";

import { z } from "zod";
import { SignUpFormStateType } from "../components/auth/signup-form";
import { UserProfileFormStateType } from "@/components/dashboard/profile/user-profile-form";
import { signOut, auth } from "@/auth";

const signupSchema = z
  .object({
    firstName: z.string().min(1, "El nombre es obligatorio"),
    lastName: z.string().min(1, "El apellido es obligatorio"),
    dni: z
      .string()
      .min(7, "El DNI debe tener al menos 7 dígitos")
      .max(10, "El DNI no puede tener más de 10 dígitos")
      .regex(/^\d+$/, "El DNI solo puede contener números"),
    email: z.string().email("El correo electrónico no es válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener entre 6 y 20 caracteres")
      .max(20, "La contraseña debe tener entre 6 y 20 caracteres")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "La contraseña debe contener al menos 1 mayúscula, 1 número y 1 carácter especial",
      ),
    confirmPassword: z.string(),
    phone: z
      .string()
      .min(7, "El teléfono debe tener al menos 7 dígitos")
      .max(15, "El teléfono es demasiado largo")
      .regex(/^\d+$/, "El teléfono solo puede contener números"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
export type SignupValues = {
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};
export async function signupAction(
  prevState: { values: SignupValues; errors: Record<string, string> },
  formData: FormData,
): Promise<SignUpFormStateType> {
  const values: SignupValues = {
    firstName: (formData.get("firstName") as string) || "",
    lastName: (formData.get("lastName") as string) || "",
    dni: (formData.get("dni") as string) || "",
    email: (formData.get("email") as string) || "",
    password: (formData.get("password") as string) || "",
    confirmPassword: (formData.get("confirmPassword") as string) || "",
    phone: (formData.get("phone") as string) || "",
  };

  // Validar usando Zod
  const parsed = signupSchema.safeParse(values);

  if (!parsed.success) {
    // Mantener los valores correctos y actualizar solo los errores
    return {
      values, // mantenemos los valores ingresados
      errors: parsed.error.flatten().fieldErrors as Record<string, string>,
      success: false,
    };
  }
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    // Hacer POST a la API
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //Dni en este punto ya fue validado por zod pero aun es string asi que lo convertimos a number
        dni: Number(values.dni),
        email: values.email,
        firstname: values.firstName,
        lastname: values.lastName,
        password: values.password,
        phone: values.phone,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();

      return {
        values,
        errors: { api: errorData.message || "Error en el registro" },
        success: false,
      };
    }

    return {
      values,
      errors: {},
      success: true, // ✅ flag para redirigir
    };
  } catch (error: unknown) {
    let message = "Error al conectar con el servidor";

    if (error instanceof Error) {
      message = error.message;
    }

    return {
      values,
      errors: { api: message },
      success: false,
    };
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

const updateUserSchema = signupSchema.pick({
  firstName: true,
  lastName: true,
  dni: true,
  email: true,
  phone: true,
});

export type UpdateUserValuesType = {
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
};

export const updateUserAction = async (
  prevState: { values: UpdateUserValuesType; errors: Record<string, string> },
  formData: FormData,
): Promise<UserProfileFormStateType> => {
  const values: UpdateUserValuesType = {
    firstName: (formData.get("firstName") as string) || "",
    lastName: (formData.get("lastName") as string) || "",
    dni: (formData.get("dni") as string) || "",
    email: (formData.get("email") as string) || "",
    phone: (formData.get("phone") as string) || "",
  };

  const parsed = updateUserSchema.safeParse(values);
  if (!parsed.success) {
    return {
      values,
      errors: parsed.error.flatten().fieldErrors as Record<string, string>,
      success: false,
    };
  }

  const session = await auth();

  if (!session?.user?.id || !session.user.token) {
    console.error("No se encontró la sesión del usuario o el token.");

    return {
      values,
      errors: {},
      success: false,
    };
  }

  const userId = session.user.id;
  const token = session.user.token;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        firstname: values.firstName,
        lastname: values.lastName,
        dni: Number(values.dni),
        email: values.email,
        phone: values.phone,
      }),
    });

    if (!res.ok) {
      return {
        values,
        errors: {},
        success: false,
      };
    }

    return {
      values,
      errors: {},
      success: true,
    };
  } catch (error: unknown) {
    let message = "Error al conectar con el servidor";
    if (error instanceof Error) message = error.message;
    console.error(message);
    return {
      values,
      errors: {},
      success: false,
    };
  }
};
