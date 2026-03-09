// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

const BASE_URL = "https://dev-notes-m03d7ntmm-wilsonchen40172s-projects.vercel.app";

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
    <html lang="zh-TW">
      <body className="bg-black text-neutral-300 min-h-screen font-sans antialiased">
        <Navbar />
        {/* 主要內容區塊置中，並限制最大寬度 */}
        <main className="max-w-4xl mx-auto px-6 py-10 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}