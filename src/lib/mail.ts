import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT as string, 10),
    secure: false,
  });

  const resetUrl = `http://localhost:3000/auth/resetpassword?token=${token}`;

  const mailOptions = {
    from: '"Votre Application" <support@synes.com>',
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    text: `Cliquez sur le lien pour réinitialiser votre mot de passe : ${resetUrl}`,
    html: `<p>Cliquez sur le lien pour réinitialiser votre mot de passe : <a href="${resetUrl}">${resetUrl}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
}
