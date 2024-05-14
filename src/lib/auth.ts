import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
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
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        // TODO: REMPLIR LE LOGIN BASE PYTHON
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
});
