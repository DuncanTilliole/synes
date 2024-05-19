import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password, token } = req.body;

  if (!email || !password || !token) {
    return res.status(400).json({ message: "Email ou Mot de passe requis" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!user || !passwordResetToken) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await prisma.passwordResetToken.delete({
      where: { id: passwordResetToken.id },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return res
      .status(200)
      .json({ message: "Email de réinitialisation envoyé" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
