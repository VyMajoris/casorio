import type { Metadata } from "next";

import "./globals.css";


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
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}
