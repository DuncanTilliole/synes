import { verifyPassword } from "@/pages/api/user";
import { ERROR_INTERNAL_SERVER, ErrorResponse } from "@/utils/types/error";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";
import prisma from "./prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/register",
    signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Synes",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email: string = credentials.email as string;
        const password: string = credentials.password as string;

        // Rechercher l'utilisateur dans la base de données
        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user) {
          return null;
        }

        // Vérifier le mot de passe
        const isValid = await verifyPassword(password, user.password as string);

        if (!isValid) {
          return null;
        }

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
});

export const registerSchema = z.object({
  name: z.string().min(1, "Le nom complet est requis"),
  email: z.string().email("L'email doit être valide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/,
      "Le mot de passe doit contenir au moins un caractère spécial"
    ),
});

export const loginSchema = z.object({
  email: z.string().email("L'email doit être valide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export async function createUser(
  values: z.infer<typeof registerSchema>
): Promise<User | ErrorResponse> {
  try {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const responseJson: User | ErrorResponse = await response.json();

    return responseJson;
  } catch {
    return ERROR_INTERNAL_SERVER;
  }
}
