import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Social Vission — Marketplace de Impacto Social",
  description:
    "Contrata servicios profesionales y genera impacto social. Cada compra destina un 10% a causas verificadas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-cloud text-dusk">
        {children}
      </body>
    </html>
  );
}
