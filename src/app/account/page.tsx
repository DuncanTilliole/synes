"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/");
    return null;
  }

  const handleSignOut = () => {
    router.push("/api/auth/signout");
  };

  return (
    <div>
      <p>You are authenticated</p>
      <Button onClick={handleSignOut}>Logout</Button>
    </div>
  );
}
