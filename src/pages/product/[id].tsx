import { useRouter } from "next/router";

export default async function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <p>Bonjour article {id}</p>
    </div>
  );
}
