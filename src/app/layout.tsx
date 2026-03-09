// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dev-notes-wilsonchen40172s-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Dev Notes | Wilson Chen",
    template: "%s | Dev Notes",
  },
  description: "前端技術筆記與 LeetCode 解題庫，涵蓋 TypeScript、React Hooks、Redux Toolkit 與 Three.js。",
  authors: [{ name: "Wilson Chen", url: BASE_URL }],
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Dev Notes",
    title: "Dev Notes | Wilson Chen",
    description: "前端技術筆記與 LeetCode 解題庫，涵蓋 TypeScript、React Hooks、Redux Toolkit 與 Three.js。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dev Notes - Wilson Chen 的前端技術筆記",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Notes | Wilson Chen",
    description: "前端技術筆記與 LeetCode 解題庫，涵蓋 TypeScript、React Hooks、Redux Toolkit 與 Three.js。",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 min-h-screen font-sans antialiased transition-colors duration-200">
        <Providers>
          <Navbar />
          <main className="max-w-4xl mx-auto px-6 py-10 w-full">
            {children}
          </main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}