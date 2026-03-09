# Dev Notes

> 個人前端技術筆記與演算法解題庫，使用 Next.js App Router + MDX 建構，支援語法高亮與靜態生成。

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![MDX](https://img.shields.io/badge/MDX-3-1B1F24?logo=mdx)](https://mdxjs.com)

**[🌐 Live Demo](https://dev-notes-m03d7ntmm-wilsonchen40172s-projects.vercel.app)**

---

## 📖 專案簡介

這是一個以 **Next.js App Router** 建構的個人技術筆記站，將學習過程中的前端知識、演算法解題思路系統化地整理，方便快速複習與查詢。

相較於傳統 Markdown 靜態網站，本專案透過 **MDX** 讓筆記內容可以內嵌 React 元件，並整合 **rehype-pretty-code** + **Shiki** 提供接近 VS Code 品質的程式碼語法高亮。

---

## ✨ 功能特色

- **MDX 筆記系統** — 支援在 Markdown 中撰寫並渲染 React 元件
- **語法高亮** — 使用 Shiki 引擎，支援 TypeScript、JavaScript 等多種語言
- **靜態生成 (SSG)** — 所有筆記頁面於 build time 預先渲染，載入速度極快
- **響應式設計** — 完整支援桌面與行動裝置瀏覽
- **深色主題** — 以深色系 UI 打造舒適的長時間閱讀體驗

---

## 🗂 筆記分類

| 分類                 | 說明                                                                      |
| -------------------- | ------------------------------------------------------------------------- |
| **基礎與語法**       | TypeScript 型別系統、React Hooks 使用時機與常見語法模式                   |
| **LeetCode 解題**    | 演算法練習，包含解題思路、時間 / 空間複雜度分析與最佳化策略               |
| **Redux 狀態管理**   | Redux Toolkit (RTK) 實戰、Store 架構設計與非同步資料流 (createAsyncThunk) |
| **Three.js 3D 渲染** | WebGL 入門、Three.js 場景建構、材質光影與互動效果                         |

---

## 🛠 技術選型

| 技術                                                        | 版本 | 用途                          |
| ----------------------------------------------------------- | ---- | ----------------------------- |
| [Next.js](https://nextjs.org)                               | 16   | App Router、SSG、檔案式路由   |
| [React](https://react.dev)                                  | 19   | UI 元件、React Compiler       |
| [TypeScript](https://www.typescriptlang.org)                | 5    | 型別安全                      |
| [Tailwind CSS](https://tailwindcss.com)                     | 4    | Utility-first 樣式系統        |
| [MDX](https://mdxjs.com)                                    | 3    | 在 Markdown 中使用 React 元件 |
| [rehype-pretty-code](https://rehype-pretty-code.vercel.app) | 0.14 | 程式碼區塊語法高亮            |
| [Shiki](https://shiki.matsu.io)                             | 3    | 語法高亮引擎                  |

---

## 📁 專案結構

```
src/
├── app/
│   ├── layout.tsx          # 全域佈局（Navbar、Metadata）
│   ├── page.tsx            # 首頁（筆記分類入口）
│   └── (notes)/            # Route Group，不影響 URL 路徑
│       ├── leetcode/
│       │   ├── page.tsx    # LeetCode 題目列表
│       │   └── two-sum/
│       │       └── page.mdx  # 個別解題筆記（MDX）
│       ├── redux/
│       │   └── page.tsx
│       ├── syntax/
│       │   ├── page.tsx
│       │   └── react-hooks/
│       │       └── page.tsx
│       └── threejs/
│           └── page.tsx
├── components/
│   └── Navbar.tsx          # 導覽列
└── mdx-components.tsx      # 全域 MDX 元件映射
```

---

## 🚀 本地開發

**前置需求**：Node.js 18+

```bash
# 安裝依賴
npm install

# 啟動開發伺服器（使用 Webpack）
npm run dev

# 建構為生產版本
npm run build

# 啟動生產伺服器
npm run start
```

開啟 [http://localhost:3000](http://localhost:3000) 即可瀏覽。

---

## 📦 部署

本專案部署於 [Vercel](https://vercel.com)。每次推送至 `main` 分支時自動觸發 CI/CD 流程。

```bash
# 使用 Vercel CLI 手動部署
npx vercel --prod
```
