import Link from "next/link";

const GITHUB_URL = "https://github.com/WilsonChen40172";
const LINKEDIN_URL = "https://linkedin.com/in/your-linkedin"; // 換成你的 LinkedIn

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

  const skills = [
    "TypeScript", "React", "Next.js", "Redux Toolkit",
    "Tailwind CSS", "Three.js", "Node.js", "Git",
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

      {/* About / Profile 區塊 */}
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* 頭像佔位 */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-white select-none">
            W
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-100">Wilson Chen</h2>
            <p className="text-neutral-400 text-sm mt-1">Frontend Developer</p>
          </div>
        </div>

        <p className="text-neutral-400 leading-relaxed">
          熱衷於前端工程與使用者體驗，專注於 React 生態系與 TypeScript 開發。
          持續透過 LeetCode 強化演算法能力，並探索 Three.js 等視覺化技術。
          這個筆記站是我學習歷程的公開紀錄，也是我對「寫下來才算真正理解」的實踐。
        </p>

        {/* 技術標籤 */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* 社群連結 */}
        <div className="flex gap-4 pt-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}

