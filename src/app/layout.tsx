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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  className={libreBaskerville.className}>
      <body
        className="family-p"
        style={{
          backgroundImage: 'url("/background_texture.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          backgroundAttachment: 'fixed',
        }}
      >
        {children}
      </body>
    </html>
  );
}
