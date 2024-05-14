"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Connectez-vous à votre compte
          </h1>
        </div>

        <form className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="nom@exemple.com"
              type="email"
              autoComplete="email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              placeholder="Votre mot de passe"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary-focus"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </form>

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
          Vous n avez pas de compte ?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary underline underline-offset-4 hover:text-primary-focus"
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
