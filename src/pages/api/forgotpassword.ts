import { sendPasswordResetEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email est requis" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    const tokenExpires = new Date(Date.now() + 3600000); // 1 heure

    // Enregistrer le token et l'heure d'expiration dans la base de données
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expires: tokenExpires,
      },
    });

    // Envoyer l'email de réinitialisation
    await sendPasswordResetEmail(user.email, token);

    return res
      .status(200)
      .json({ message: "Email de réinitialisation envoyé" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
