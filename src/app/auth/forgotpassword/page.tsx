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
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
});

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmitForm(values: z.infer<typeof forgotPasswordSchema>) {
    startTransition(async () => {
      setMessage("");

      try {
        const response = await fetch("/api/forgotpassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          setMessage("Un email de réinitialisation a été envoyé.");
        } else {
          const errorData = await response.json();
          setMessage(errorData.message || "Une erreur est survenue.");
        }
      } catch (error) {
        setMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    });
  }

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <div className="z-10 bg-white shadow-lg mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-10 rounded">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Mot de passe oublié
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="exemple@exemple.com" {...field} />
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
                Envoyer
              </Button>
            </div>
            {message && <p>{message}</p>}
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Ou continuer avec
            </span>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500">
          Vous avez déjà un compte ?{" "}
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
