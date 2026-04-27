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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-[var(--brand-cobalt)] focus:text-white focus:font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--brand-yellow)]"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
