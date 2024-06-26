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
import { loginSchema } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmitForm(values: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      setError("");

      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setError("Email ou mot de passe incorrect.");
      } else {
        redirect("/"); // Rediriger vers la page d'accueil ou une autre page après la connexion
      }
    });
  }

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <div className="z-10 bg-white shadow-lg mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-10 rounded">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Connectez-vous à votre compte
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder="mot de passe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Link
                href="/auth/forgotpassword"
                className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary-focus"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <div>
              <Button
                type="submit"
                className="w-full mt-3"
                disabled={isPending}
              >
                Se connecter
              </Button>
            </div>
            <p>{error}</p>
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

        <Button
          variant="outline"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full"
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          Se connecter avec Google
        </Button>

        <p className="text-center text-sm text-gray-500">
          Vous n&#39; avez pas de compte ?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-primary underline underline-offset-4 hover:text-primary-focus"
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
