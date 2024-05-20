import Header from "@/_components/Header";
import ListProducts from "@/_components/ListProducts";
import Video from "@/_components/Video";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <Header session={session} darkMode={true} />
      <Video
        sourceProps={{
          src: "/home_video_test.mp4",
        }}
        autoPlay
        delayAutoPlay={2000} // Délai de 2 secondes avant la lecture automatique
      />
      <ListProducts />
    </main>
  );
}
