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
          <header className="sticky top-0 z-50 glass border-b border-border/50">
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="font-bold text-xl gradient-text group-hover:scale-105 transition-transform">
                  GymShah
                </span>
              </Link>
              <div className="flex items-center space-x-1">
                <Link href="/shop" className="px-4 py-2 rounded-lg hover:bg-secondary/50 hover:text-primary transition-all duration-200 font-medium">
                  Shop
                </Link>
                <Link href="/signup" className="px-4 py-2 rounded-lg hover:bg-secondary/50 hover:text-primary transition-all duration-200 font-medium">
                  Sign Up
                </Link>
                <Link href="/account" className="px-4 py-2 rounded-lg hover:bg-secondary/50 hover:text-primary transition-all duration-200 font-medium">
                  Account
                </Link>
                <Link href="/cart" className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 transition-all duration-200 font-medium">
                  🛒 Cart
                </Link>
              </div>
            </nav>
          </header>
          <main className="flex-1">
            <Suspense fallback={<div className="p-6">Loading...</div>}>
              {children}
            </Suspense>
          </main>
          <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">G</span>
                  </div>
                  <span className="font-bold text-lg gradient-text">GymShah</span>
                </div>
                <p className="text-muted-foreground text-sm mb-2">
                  Elevate your fitness journey with premium gear and supplements
                </p>
                <p className="text-muted-foreground text-xs">
                  © {new Date().getFullYear()} GymShah. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
