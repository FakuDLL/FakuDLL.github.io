import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fakudll.github.io/",
  ),
  title: "Facundo Robayna — Desarrollador de Software Junior",
  description:
    "Portfolio de Facundo Robayna, estudiante de TI y desarrollador de software junior en Montevideo, Uruguay.",
  keywords: [
    "Facundo Robayna",
    "desarrollador junior",
    "desarrollador .NET",
    "C#",
    "ASP.NET Web API",
    "Montevideo",
    "Uruguay",
  ],
  authors: [{ name: "Facundo Robayna" }],
  creator: "Facundo Robayna",
  openGraph: {
    type: "website",
    locale: "es_UY",
    title: "Facundo Robayna — Desarrollador de Software Junior",
    description:
      "Software con criterio y propósito. Proyectos, tecnologías y experiencia de Facundo Robayna.",
    siteName: "Portfolio de Facundo Robayna",
    images: [
      {
        url: "/og.png",
        width: 1732,
        height: 909,
        alt: "Facundo Robayna — Desarrollador de Software Junior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facundo Robayna — Desarrollador de Software Junior",
    description:
      "Software con criterio y propósito. Proyectos, tecnologías y experiencia.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09130f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
