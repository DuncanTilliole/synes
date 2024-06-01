import Header from "@/_components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header withBackground fixed />
      <div className="bg-white opacity-90"></div>
      {children}
    </div>
  );
}
