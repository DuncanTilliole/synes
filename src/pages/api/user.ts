import prisma from "@/lib/prisma";
import { stripe } from "@/lib/utils";
import {
  ERROR_INTERNAL_SERVER,
  ERROR_USER_ALREADY_EXISTS,
} from "@/utils/types/error";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      if (req.query.id) {
        // GET user/{id}
        return; //getUserById(req, res);
      } else {
        // GET users
        return; //getUsers(req, res);
      }
    case "POST":
      // POST user
      return createUser(req, res);
    case "PUT":
      // PUT user/{id}
      return; //updateUser(req, res);
    case "DELETE":
      // DELETE user/{id}
      return; //deleteUser(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, email, password } = req.body;

    // Vérifier si un utilisateur avec le même email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json(ERROR_USER_ALREADY_EXISTS);
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 8);

    // Créer un nouvel utilisateur avec une transaction pour garantir l'intégrité
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        accounts: {
          create: {
            type: "credentials",
            provider: "credentials",
            providerAccountId: email, // assuming email is used as the providerAccountId
          },
        },
        sessions: {
          create: {
            sessionToken: generateSessionToken(),
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiry
          },
        },
      },
      include: {
        accounts: true,
        sessions: true,
      },
    });

    const stripeCustomer = await stripe.customers.create({
      email,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        stripeCustomerId: stripeCustomer.id,
      },
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json(ERROR_INTERNAL_SERVER);
  }
}

function generateSessionToken() {
  return require("crypto").randomBytes(32).toString("hex");
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}
