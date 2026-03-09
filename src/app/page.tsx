import Link from "next/link";

export default function Home() {
  const topics = [
    {
      title: "基礎與語法",
      description: "TypeScript 與 React 的核心概念、Hooks 使用時機與常見語法筆記。",
      href: "/syntax",
      color: "bg-blue-500",
    },
    {
      title: "LeetCode 解題",
      description: "演算法練習紀錄，包含解題思路、複雜度分析與最佳化策略。",
      href: "/leetcode",
      color: "bg-yellow-500",
    },
    {
      title: "Redux 狀態管理",
      description: "Redux Toolkit (RTK) 實戰應用、Store 設計與非同步資料流處理。",
      href: "/redux",
      color: "bg-purple-500",
    },
    {
      title: "Three.js 3D 渲染",
      description: "WebGL 與 Three.js 的 3D 場景開發、材質光影與互動效果筆記。",
      href: "/threejs",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      <header className="text-center py-10">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          Dev Notes
        </h1>
        <p className="text-neutral-400 text-xl max-w-2xl mx-auto">
          這是一個個人的技術筆記庫，收錄了前端開發、演算法練習以及各種實驗性專案的心得。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic) => (
          <Link
            key={topic.title}
            href={topic.href}
            className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 transition-all hover:border-neutral-700 hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/50"
          >
            <div className={`absolute top-0 right-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity ${topic.color}`} />
            <h2 className="text-2xl font-bold mb-3 text-neutral-100 group-hover:text-white relative z-10">
              {topic.title}
            </h2>
            <p className="text-neutral-400 group-hover:text-neutral-300 relative z-10">
              {topic.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
