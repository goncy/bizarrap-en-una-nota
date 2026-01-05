import type {Metadata, Viewport} from "next";

import {Analytics} from "@vercel/analytics/next";
import {Rock_Salt} from "next/font/google";

import "./globals.css";

const rockSalt = Rock_Salt({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rock-salt",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "#1a1a2e"},
    {media: "(prefers-color-scheme: dark)", color: "#1a1a2e"},
  ],
};

export const metadata: Metadata = {
  title: {
    default: "En Una Nota - Adiviná la Bizarrap Session",
    template: "%s | En Una Nota",
  },
  description:
    "¿Podés adivinar qué Bizarrap Session es escuchando solo una nota? Poné a prueba tu conocimiento de las BZRP Music Sessions en este juego musical.",
  keywords: [
    "Bizarrap",
    "BZRP",
    "Music Sessions",
    "juego musical",
    "adivinar canción",
    "trivia musical",
    "Quevedo",
    "Shakira",
    "L-Gante",
    "sessions",
    "reggaeton",
    "trap",
    "argentina",
  ],
  authors: [{name: "Goncy"}],
  creator: "Goncy",
  publisher: "Goncy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "En Una Nota",
    title: "En Una Nota - Adiviná la Bizarrap Session",
    description:
      "¿Podés adivinar qué Bizarrap Session es escuchando solo una nota? Poné a prueba tu conocimiento de las BZRP Music Sessions.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "En Una Nota - Juego de Bizarrap Sessions",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "En Una Nota - Adiviná la Bizarrap Session",
    description:
      "¿Podés adivinar qué Bizarrap Session es escuchando solo una nota? Poné a prueba tu conocimiento.",
    images: ["/og.jpg"],
    creator: "@goncy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {url: "/favicon.ico", sizes: "any"},
      {url: "/icon.svg", type: "image/svg+xml"},
    ],
    apple: [{url: "/apple-touch-icon.png", sizes: "180x180"}],
  },
  manifest: "/manifest.webmanifest",
  category: "games",
  classification: "Music Game",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "En Una Nota",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body className={`${rockSalt.variable} font-rock-salt h-dvh overflow-hidden antialiased`}>
        {children}
      </body>
      <Analytics />
    </html>
  );
}
