import Header from "@/_components/Header";
import Image from "next/image";
import bgImage from "/public/fond_login.jpg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header withBackground />
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
      <div className="absolute inset-0 bg-white opacity-90"></div>
      {children}
    </div>
  );
}
