import type { Metadata } from "next";

import "./globals.css";
import { Libre_Baskerville } from "next/font/google";
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
});

export const metadata: Metadata = {
  title: "Eduardo & Lília: Lista de presentes",
  description: "Lista de presentes para o casamento de Eduardo e Lília",
  // Aqui dizemos pro Next gerar automaticamente <link rel="icon" href="/favicon-32x32.png">, etc.
  icons: {
    icon: [
 
      { url: "/favicon3.ico",         sizes: undefined, type: undefined },
    ],
    shortcut: "/favicon3.ico",
    apple: "/apple-touch-icon3.png",

  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={libreBaskerville.className}>
      <head>
     
      </head>
      <body
        className="family-p"
        style={{
          backgroundImage: 'url("/background_texture.png")',
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundAttachment: "fixed",
        }}
      >
        {children}
      </body>
    </html>
  );
}
