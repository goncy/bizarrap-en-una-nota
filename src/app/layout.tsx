import type {Metadata} from "next";

import {Rock_Salt} from "next/font/google";

import "./globals.css";

const rockSalt = Rock_Salt({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rock-salt",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Bizarrap - En una nota",
  description: "Adiviná la session en una nota",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${rockSalt.variable} font-rock-salt min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
