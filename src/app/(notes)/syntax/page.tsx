import React from 'react';

export default function SyntaxPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-4xl font-bold mb-4 text-blue-400">基礎與語法</h1>
                <p className="text-neutral-400 text-lg">
                    TypeScript 與 React 的核心概念、Hooks 使用時機與常見語法筆記。
                </p>
            </header>

            <div className="grid gap-8">
                <section className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50">
                    <h2 className="text-2xl font-semibold mb-6 text-neutral-200 border-b border-neutral-800 pb-2">React Hooks 重點</h2>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-medium text-blue-300 mb-3">useEffect & Cleanup</h3>
                            <p className="text-neutral-400 mb-3">
                                用於處理副作用 (Side Effects)。回傳的函數會在元件卸載或依賴改變前執行，適合做清理工作。
                            </p>
                            <pre className="bg-neutral-950 p-4 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800">
                                {`useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  
  // Cleanup function: 防止記憶體洩漏
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // Empty dependency array: 只在 mount 時執行一次`}
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium text-blue-300 mb-3">useMemo vs useCallback</h3>
                            <ul className="list-disc list-inside text-neutral-400 space-y-2 mb-3">
                                <li><span className="text-neutral-200">useMemo</span>: 快取<strong>計算結果</strong> (Value)。</li>
                                <li><span className="text-neutral-200">useCallback</span>: 快取<strong>函數定義</strong> (Function)，防止子元件不必要的重新渲染。</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50">
                    <h2 className="text-2xl font-semibold mb-6 text-neutral-200 border-b border-neutral-800 pb-2">TypeScript 技巧</h2>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-medium text-blue-300 mb-3">Generics (泛型)</h3>
                            <p className="text-neutral-400 mb-3">讓元件或函數能接受多種型別，保持型別安全。</p>
                            <pre className="bg-neutral-950 p-4 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800">
                                {`interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 使用時指定具體型別
const userResponse: ApiResponse<User> = await fetchUser();`}
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium text-blue-300 mb-3">Utility Types</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                                    <code className="text-yellow-300 block mb-2">Partial&lt;T&gt;</code>
                                    <p className="text-sm text-neutral-500">將 T 的所有屬性變為可選 (Optional)。</p>
                                </div>
                                <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                                    <code className="text-yellow-300 block mb-2">Pick&lt;T, K&gt;</code>
                                    <p className="text-sm text-neutral-500">從 T 中挑選部分屬性 K 構成新型別。</p>
                                </div>
                                <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                                    <code className="text-yellow-300 block mb-2">Omit&lt;T, K&gt;</code>
                                    <p className="text-sm text-neutral-500">從 T 中排除屬性 K。</p>
                                </div>
                                <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                                    <code className="text-yellow-300 block mb-2">Record&lt;K, T&gt;</code>
                                    <p className="text-sm text-neutral-500">建立一個物件型別，鍵為 K，值為 T。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}