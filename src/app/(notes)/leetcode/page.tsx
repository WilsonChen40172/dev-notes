import React from 'react';

interface Problem {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
    note: string;
}

export default function LeetCodePage() {
    const problems: Problem[] = [
        {
            id: 1,
            title: "Two Sum",
            difficulty: "Easy",
            tags: ["Array", "Hash Table"],
            note: "使用 Hash Map 儲存走過的數值與索引，只需遍歷一次 O(n)。"
        },
        {
            id: 15,
            title: "3Sum",
            difficulty: "Medium",
            tags: ["Array", "Two Pointers"],
            note: "先排序，固定一個數後，使用雙指針尋找另外兩個數，注意去重。"
        },
        {
            id: 206,
            title: "Reverse Linked List",
            difficulty: "Easy",
            tags: ["Linked List"],
            note: "Iterative 解法需三個指針 (prev, curr, next)；Recursive 解法需注意 base case。"
        },
        {
            id: 42,
            title: "Trapping Rain Water",
            difficulty: "Hard",
            tags: ["Two Pointers", "DP"],
            note: "左右兩邊最高牆取 min 減去當前高度。可用雙指針優化空間至 O(1)。"
        }
    ];

    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case 'Easy': return 'text-green-400 bg-green-900/30 border-green-900';
            case 'Medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-900';
            case 'Hard': return 'text-red-400 bg-red-900/30 border-red-900';
            default: return 'text-neutral-400';
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-4xl font-bold mb-4 text-yellow-400">LeetCode 解題</h1>
                <p className="text-neutral-400 text-lg">
                    演算法練習紀錄，包含解題思路、複雜度分析與最佳化策略。
                </p>
            </header>

            <div className="grid gap-4">
                {problems.map((p) => (
                    <div key={p.id} className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-colors group">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="text-xl font-semibold text-neutral-200 group-hover:text-yellow-200 transition-colors">
                                    {p.id}. {p.title}
                                </h3>
                                <div className="flex gap-2 mt-2">
                                    {p.tags.map(tag => (
                                        <span key={tag} className="text-xs text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(p.difficulty)}`}>
                                {p.difficulty}
                            </span>
                        </div>
                        <p className="text-neutral-400 text-sm border-t border-neutral-800 pt-3 mt-3">
                            {p.note}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}