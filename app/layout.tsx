import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "./LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fakudll.github.io/",
  ),
  title: "Facundo Robayna — Junior Software Developer",
  description:
    "Facundo Robayna, software developer in Montevideo. Freelance workflow automation, Excel and CSV processing, API integrations and web development.",
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
  other: {
    google: "notranslate",
  },
  icons: {
    icon: [{ url: "/favicon-fr.svg", type: "image/svg+xml" }],
    shortcut: "/favicon-fr.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_UY"],
    title: "Facundo Robayna — Junior Software Developer",
    description:
      "Workflow automation, Excel and CSV processing, API integrations and web development.",
    siteName: "Portfolio de Facundo Robayna",
    images: [
      {
        url: "/og.png",
        width: 1732,
        height: 909,
        alt: "Facundo Robayna — Junior Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facundo Robayna — Junior Software Developer",
    description:
      "Workflow automation, data processing and software development.",
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
  themeColor: "#080a0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" className="notranslate">
      <body translate="no">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
