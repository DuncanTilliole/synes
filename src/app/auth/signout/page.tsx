"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <div className="z-10 bg-white shadow-lg mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-10 rounded">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Déconnexion</h1>
          <p>Voulez-vous vraiment vous déconnecter ?</p>
        </div>
        <div className="flex justify-between">
          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-1/2 mr-2"
          >
            Oui
          </Button>
          <Button onClick={() => router.back()} className="w-1/2 ml-2">
            Non
          </Button>
        </div>
      </div>
    </div>
  );
}
