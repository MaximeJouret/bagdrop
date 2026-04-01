import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BagDrop — Consigne de bagages à Bruxelles",
  description:
    "Déposez vos bagages en toute sécurité dans nos casiers connectés aux meilleurs emplacements touristiques de Bruxelles. Réservez en ligne, accédez par QR code.",
  openGraph: {
    title: "BagDrop — Consigne de bagages à Bruxelles",
    description:
      "Déposez vos bagages en toute sécurité dans nos casiers connectés aux meilleurs emplacements touristiques de Bruxelles.",
    locale: "fr_BE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
