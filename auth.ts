// app/lib/auth.ts
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { object, string } from "zod";
import "next-auth/jwt";

export const signInSchema = object({
  email: string().email("El correo electrónico no es válido"),
  password: string()
    .min(6, "La contraseña debe tener entre 6 y 20 caracteres")
    .max(20, "La contraseña debe tener entre 6 y 20 caracteres")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      "La contraseña debe contener al menos 1 mayúscula, 1 número y 1 carácter especial",
    ),
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      token?: string;
    } & DefaultSession["user"];
  }

  interface User {
    token?: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });

          if (!res.ok) return null;

          const data = await res.json();
          return {
            email: email,
            token: data.token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.token) token.accessToken = user.token;
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
