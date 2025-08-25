// app/lib/auth.ts
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { object, string } from "zod";
import "next-auth/jwt";
import { getAccountData, getUserDetails, login } from "@/services";

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
    user: {
      id: string;
      accountId: number;
      token: string;
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    accountId: number;
    token?: string;
    email: string;
    firstName: string;
    lastName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id: number;
    accountId: number;
    firstName: string;
    lastName: string;
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

          const token = await login(email, password);
          if (!token) return null;
          const accountData = await getAccountData(token);
          if (!accountData) return null;
          const userDetails = await getUserDetails(accountData.user_id, token);
          if (!userDetails) return null;

          return {
            id: userDetails.id,
            accountId: accountData.id,
            email: email,
            firstName: userDetails.firstname,
            lastName: userDetails.lastname,
            token: token,
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
  jwt: {
    maxAge: 2 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id as number;
        token.accountId = user.accountId as number;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accountId: token.accountId,
          token: token.accessToken,
          firstName: token.firstName,
          lastName: token.lastName,
        },
      };
    },
  },
});
