import Header from "@/_components/Header";
import Video from "@/_components/Video";

export default function Home() {
  return (
    <main>
      <Header />
      <Video
        sourceProps={{
          src: "/home_video.mp4",
        }}
        autoPlay
        delayAutoPlay={2000} // Délai de 2 secondes avant la lecture automatique
      />
    </main>
  );
}
