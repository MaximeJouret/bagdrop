import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { AtelierMascot } from "@/components/theme/atelier-mascot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "BagDrop — Logistique bagages premium à Bruxelles",
  description:
    "Le concierge bagages de votre hôtel. Collecte chez vos clients, livraison directe à l'aéroport. Brussels Airport et Charleroi.",
  openGraph: {
    title: "BagDrop — Logistique bagages premium à Bruxelles",
    description:
      "Collecte chez vos clients, livraison directe à l'aéroport. Brussels Airport et Charleroi.",
    locale: "fr_BE",
    type: "website",
  },
};

// Inline script to apply stored theme before hydration (avoids flash)
const noFlashScript = `
(function() {
  try {
    var t = localStorage.getItem('bagdrop-theme');
    if (t === 'dopamine' || t === 'atelier') {
      document.documentElement.classList.add('theme-' + t);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-[var(--brand-cobalt)] focus:text-white focus:font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--brand-yellow)]"
        >
          Aller au contenu principal
        </a>
        <ThemeProvider>
          <ScrollProgress />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <ThemeSwitcher />
          <AtelierMascot />
        </ThemeProvider>
      </body>
    </html>
  );
}
