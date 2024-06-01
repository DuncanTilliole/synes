import { cn } from "@/lib/utils";
import { NextAuthProvider, ProductProvider } from "@/utils/context/context";
import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfairDisplayCaption = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-caption",
});

export const metadata: Metadata = {
  title: "Synes",
  description: "Synes Shop, new french brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          montserrat.variable,
          playfairDisplayCaption.variable,
          "font-montserrat h-full"
        )}
      >
        <NextAuthProvider>
          <ProductProvider>{children}</ProductProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
