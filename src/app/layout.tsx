// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "My Dev Notes",
  description: "個人前端技術筆記與 LeetCode 解題庫",
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