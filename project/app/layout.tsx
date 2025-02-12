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
  title: "Short Link - URL Shortener",
  description: "Create short, memorable links from long URLs. Free and easy to use URL shortener service.",
  keywords: "url shortener, link shortener, short links, url management",
  openGraph: {
    title: "Short Link - URL Shortener",
    description: "Create short, memorable links from long URLs",
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
    <html lang="en">
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
