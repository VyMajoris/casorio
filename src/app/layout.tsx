import type { Metadata } from "next";

import "./globals.css";
import { Libre_Baskerville } from "next/font/google";
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
});

export const metadata: Metadata = {
  title: "Lília & Eduardo: Lista de presentes",
  description: "Lista de presentes para o casamento de Lília e Eduardo",
  icons: {
    icon: "/favicon.ico",
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
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
