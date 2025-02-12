import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./ui/footer";
import Header from "./ui/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Short Link - Raccourcisseur d'URL",
  description: "Créez des liens courts et mémorables à partir de longues URL. Service de raccourcissement d'URL gratuit et facile à utiliser.",
  keywords: "raccourcisseur d'URL, raccourcisseur de lien, liens courts, gestion d'URL",
  openGraph: {
    title: "Short Link - Raccourcisseur d'URL",
    description: "Créez des liens courts et mémorables à partir de longues URL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="google-site-verification" content="6AIRED9V_kZ6syLN_G8GYH9yDc_jwKbfWbDfhFJbYi0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased vsc-initialized`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
