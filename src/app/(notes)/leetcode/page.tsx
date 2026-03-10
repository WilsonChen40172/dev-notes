import React from 'react';
import Link from 'next/link';
import ViewCounter from '@/components/ViewCounter';

interface Problem {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
    note: string;
    slug?: string; // 有詳細筆記的題目
}

export default function LeetCodePage() {
    const problems: Problem[] = [
        {
            id: 1,
            title: "Two Sum",
            difficulty: "Easy",
            tags: ["Array", "Hash Table"],
            note: "使用 Hash Map 儲存走過的數值與索引，只需遍歷一次 O(n)。",
            slug: "two-sum",
        },
        {
            id: 11,
            title: "Container With Most Water",
            difficulty: "Medium",
            tags: ["Array", "Two Pointers", "Greedy"],
            note: "雙指針從兩端向內收縮，每次移動高度較小的那一端，因為移動高的那端只會讓面積更小。",
        },
        {
            id: 15,
            title: "3Sum",
            difficulty: "Medium",
            tags: ["Array", "Two Pointers", "Sorting"],
            note: "先排序，固定一個數後，使用雙指針尋找另外兩個數，注意去重。",
            slug: "3sum",
        },
        {
            id: 20,
            title: "Valid Parentheses",
            difficulty: "Easy",
            tags: ["Stack", "String"],
            note: "用 Stack 配合 Hash Map 對照開閉括號。遇開括號 push，遇閉括號 pop 比對，最終 stack 需為空。",
            slug: "valid-parentheses",
        },
        {
            id: 21,
            title: "Merge Two Sorted Lists",
            difficulty: "Easy",
            tags: ["Linked List", "Recursion"],
            note: "比較兩個 ListNode 的值，遞迴地接上較小的節點；Iterative 則用 dummy head 簡化邊界處理。",
        },
        {
            id: 42,
            title: "Trapping Rain Water",
            difficulty: "Hard",
            tags: ["Two Pointers", "DP"],
            note: "左右兩邊最高牆取 min 減去當前高度。可用雙指針優化空間至 O(1)。",
            slug: "trapping-rain-water",
        },
        {
            id: 49,
            title: "Group Anagrams",
            difficulty: "Medium",
            tags: ["Array", "Hash Table", "Sorting", "String"],
            note: "同一組異位詞排序後相同，以排序結果作為 Map key 分組。進階可用 26 字元頻率陣列作 key。",
            slug: "group-anagrams",
        },
        {
            id: 56,
            title: "Merge Intervals",
            difficulty: "Medium",
            tags: ["Array", "Sorting"],
            note: "先按區間起點排序，再依序合併：若當前區間起點 ≤ 前一區間終點，則延伸終點；否則新開一個區間。",
        },
        {
            id: 104,
            title: "Maximum Depth of Binary Tree",
            difficulty: "Easy",
            tags: ["Tree", "DFS", "BFS"],
            note: "DFS 遞迴：max(左子樹深度, 右子樹深度) + 1。BFS 層序遍歷：每跑一層 depth++，直到佇列清空。",
        },
        {
            id: 121,
            title: "Best Time to Buy and Sell Stock",
            difficulty: "Easy",
            tags: ["Array", "Greedy"],
            note: "一次遍歷，維護 minPrice 與 maxProfit，每天更新最低買入價，並計算今日賣出利潤是否創新高。",
            slug: "best-time-to-buy-and-sell-stock",
        },
        {
            id: 200,
            title: "Number of Islands",
            difficulty: "Medium",
            tags: ["Array", "DFS", "BFS", "Union Find"],
            note: "遇到陸地 '1' 就 DFS/BFS 把整個連通的島嶼全部標記為已訪問，計數器 +1。時間複雜度 O(m×n)。",
        },
        {
            id: 206,
            title: "Reverse Linked List",
            difficulty: "Easy",
            tags: ["Linked List", "Recursion"],
            note: "Iterative 解法需三個指針 (prev, curr, next)；Recursive 解法需注意 base case。",
        },
        {
            id: 238,
            title: "Product of Array Except Self",
            difficulty: "Medium",
            tags: ["Array", "Prefix Sum"],
            note: "不能用除法。前綴積填入輸出陣列後，再從右往左用一個 right 變數累乘後綴積，空間 O(1)。",
            slug: "product-of-array-except-self",
        },
    ];

    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case 'Easy': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border-green-400 dark:border-green-900';
            case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 border-yellow-400 dark:border-yellow-900';
            case 'Hard': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border-red-400 dark:border-red-900';
            default: return 'text-neutral-400';
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-4xl font-bold mb-4 text-yellow-400">LeetCode 解題</h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                    演算法練習紀錄，包含解題思路、複雜度分析與最佳化策略。
                </p>
                <ViewCounter slug="leetcode" />
            </header>

            <div className="grid gap-4">
                {problems.map((p) => (
                    <div key={p.id} className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors group">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-yellow-600 dark:group-hover:text-yellow-200 transition-colors">
                                        {p.id}. {p.title}
                                    </h3>
                                    {p.slug && (
                                        <Link
                                            href={`/leetcode/${p.slug}`}
                                            className="text-xs px-2 py-0.5 rounded bg-yellow-900/40 text-yellow-400 border border-yellow-900 hover:bg-yellow-900/70 transition-colors"
                                        >
                                            詳細筆記 →
                                        </Link>
                                    )}
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {p.tags.map(tag => (
                                        <span key={tag} className="text-xs text-neutral-600 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(p.difficulty)}`}>
                                {p.difficulty}
                            </span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm border-t border-neutral-200 dark:border-neutral-800 pt-3 mt-3">
                            {p.note}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}