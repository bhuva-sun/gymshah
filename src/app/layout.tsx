import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Providers from "@/components/providers";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GymShah - Fitness & Supplements Store",
    template: "%s | GymShah",
  },
  description: "Shop fitness gear and supplements. Quality products, fast checkout.",
  keywords: ["fitness", "supplements", "e-commerce", "gym", "protein"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Providers>
          <header className="border-b sticky top-0 bg-background/80 backdrop-blur z-10">
            <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
              <Link href="/" className="font-semibold text-lg">GymShah</Link>
              <div className="flex items-center gap-4">
                <Link href="/shop" className="hover:underline">Shop</Link>
                <Link href="/account" className="hover:underline">Account</Link>
                <Link href="/cart" className="hover:underline">Cart</Link>
              </div>
            </nav>
          </header>
          <main className="flex-1">
            <Suspense fallback={<div className="p-6">Loading...</div>}>
              {children}
            </Suspense>
          </main>
          <footer className="border-t p-6 text-center text-sm">© {new Date().getFullYear()} GymShah</footer>
        </Providers>
      </body>
    </html>
  );
}
