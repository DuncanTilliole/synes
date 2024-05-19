"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/,
        "Le mot de passe doit contenir au moins un caractère spécial"
      ),
    confirmPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/,
        "Le mot de passe doit contenir au moins un caractère spécial"
      ),
    email: z.string(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      email: "",
      token: "",
    },
  });

  async function onSubmitForm(values: z.infer<typeof forgotPasswordSchema>) {
    if (token) {
      startTransition(async () => {
        setMessage("");

        try {
          const decodedToken: any = jwt.decode(token);

          if (decodedToken && decodedToken?.email) {
            values.email = decodedToken.email;
            values.token = token;

            const response = await fetch("/api/resetpassword", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            if (response.ok) {
              setMessage("Le mot de passe a été réinitialisé.");
            } else {
              const errorData = await response.json();
              setMessage(errorData.message || "Une erreur est survenue.");
            }
          } else {
            setMessage("Lien fourni incorrect");
          }
        } catch (error) {
          setMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
        }
      });
    }
  }

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <div className="z-10 bg-white shadow-lg mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-10 rounded">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Réinitialisation du mot de passe
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button
                type="submit"
                className="w-full mt-3"
                disabled={isPending}
              >
                Confirmer
              </Button>
            </div>
            {message && <p>{message}</p>}
          </form>
        </Form>
        <p className="text-center text-sm text-gray-500">
          <Link
            href="/auth/signin"
            className="font-semibold text-primary underline underline-offset-4 hover:text-primary-focus"
          >
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
