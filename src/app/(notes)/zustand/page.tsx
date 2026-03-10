import ViewCounter from '@/components/ViewCounter';

export const metadata = {
    title: 'Zustand 狀態管理 | Dev Notes',
    description: 'Zustand 輕量級狀態管理：Store 建立、非同步操作、Middleware 與 TypeScript 整合。',
}

export default function ZustandPage() {
    return (
        <div className="flex flex-col gap-12">
            <header>
                <h1 className="text-4xl font-bold mb-4 text-orange-400">Zustand 狀態管理</h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                    輕量、無樣板、基於 Hook 的狀態管理方案：Store 建立、Slice 模式、非同步操作、Middleware（persist / devtools）與 TypeScript 整合。
                </p>
                <ViewCounter slug="zustand" />
            </header>

            {/* ── 1. 核心概念 ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">核心概念</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-orange-600 dark:text-orange-300 mb-2">Store</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            透過 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-orange-700 dark:text-orange-300 text-xs">create()</code> 建立 store，回傳一個自訂 hook。<strong className="text-neutral-700 dark:text-neutral-300">state 與 action 都定義在同一個地方</strong>，不需要額外的 Provider 包裹。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-orange-600 dark:text-orange-300 mb-2">Selector 訂閱</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            呼叫 hook 時傳入 selector function（如 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-orange-700 dark:text-orange-300 text-xs">state =&gt; state.count</code>），元件只在<strong className="text-neutral-700 dark:text-neutral-300">所訂閱的值改變</strong>時才重新 render，精準避免多餘更新。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-orange-600 dark:text-orange-300 mb-2">Immer 整合（可選）</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            搭配 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-orange-700 dark:text-orange-300 text-xs">immer</code> middleware 後，可在 set 函數中<strong className="text-neutral-700 dark:text-neutral-300">直接 mutate state</strong>，不需手動展開物件。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-orange-600 dark:text-orange-300 mb-2">無 Provider</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            Zustand store 是模組層級的<strong className="text-neutral-700 dark:text-neutral-300">單例（singleton）</strong>，不需要在 React tree 最外層包裹 Provider，可在任何地方（包含元件外）讀取與更新 state。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-orange-600 dark:text-orange-300 mb-2">Middleware</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            官方提供 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-orange-700 dark:text-orange-300 text-xs">persist</code>（持久化到 localStorage）、<code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-orange-700 dark:text-orange-300 text-xs">devtools</code>（Redux DevTools 支援）等常用 middleware，可自由組合。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-orange-600 dark:text-orange-300 mb-2">subscribe（React 外使用）</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            透過 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-orange-700 dark:text-orange-300 text-xs">useStore.subscribe(listener)</code> 可在<strong className="text-neutral-700 dark:text-neutral-300">元件或 React 之外</strong>監聽 state 變化，適合整合第三方函式庫或觸發 side effect。
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 2. 基本安裝與建立 Store ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">基本安裝與建立 Store（TypeScript）</h2>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-300">安裝</h3>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`npm install zustand`}</pre>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-300">建立第一個 Store</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        用 TypeScript interface 定義 state 與 actions 的型別，傳入 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-orange-700 dark:text-orange-300 text-xs">create&lt;T&gt;()</code>。
                    </p>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// stores/useCounterStore.ts
import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))`}</pre>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-300">在元件中使用</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        直接呼叫 hook 並傳入 selector，元件只訂閱需要的欄位，<strong className="text-neutral-700 dark:text-neutral-300">不需要 Provider</strong>。
                    </p>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// components/Counter.tsx
import { useCounterStore } from '@/stores/useCounterStore'

export default function Counter() {
  // selector：只訂閱 count，action 改變不觸發重渲
  const count = useCounterStore((state) => state.count)
  const { increment, decrement, reset } = useCounterStore()

  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}`}</pre>
                </div>
            </section>

            {/* ── 3. 非同步操作 ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">非同步操作</h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm -mt-2">
                    Zustand 不需要特殊的非同步 middleware（如 Thunk）。直接在 action 中使用 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-orange-700 dark:text-orange-300 text-xs">async/await</code>，呼叫 set 更新狀態即可。
                </p>

                <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// stores/useUserStore.ts
import { create } from 'zustand'

interface User { id: number; name: string }

interface UserState {
  users: User[]
  isLoading: boolean
  error: string | null
  fetchUsers: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await fetch('/api/users')
      const data: User[] = await res.json()
      set({ users: data, isLoading: false })
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false })
    }
  },
}))`}</pre>

                <div className="p-5 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/40">
                    <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2 text-sm">與 Redux Thunk 的比較</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-500">
                        Redux 需要 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs">createAsyncThunk</code> + <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs">extraReducers</code> 處理 pending / fulfilled / rejected 三種狀態。Zustand 直接在 action 函數中使用 async/await，<strong className="text-neutral-700 dark:text-neutral-300">程式碼量大幅減少</strong>。
                    </p>
                </div>
            </section>

            {/* ── 4. Middleware ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Middleware</h2>

                {/* persist */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-300">persist — 持久化 State</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        將選定的 state 欄位自動儲存到 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-orange-700 dark:text-orange-300 text-xs">localStorage</code>（或自訂 storage），頁面重整後自動還原。
                    </p>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ThemeState {
  theme: 'light' | 'dark'
  setTheme: (t: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (t) => set({ theme: t }),
    }),
    {
      name: 'theme-storage',              // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }), // 只持久化 theme
    }
  )
)`}</pre>
                </div>

                {/* devtools */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-300">devtools — Redux DevTools 整合</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        包裹 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-orange-700 dark:text-orange-300 text-xs">devtools()</code> 後，可在瀏覽器的 Redux DevTools 擴充套件中即時追蹤 state 變化。
                    </p>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// 組合多個 middleware：devtools 包外層，persist 包內層
export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        addItem: (item) =>
          set(
            (state) => ({ items: [...state.items, item] }),
            false,
            'cart/addItem'   // ← Action 名稱，顯示在 DevTools
          ),
        total: () => get().items.reduce((sum, i) => sum + i.price, 0),
      }),
      { name: 'cart-storage' }
    ),
    { name: 'CartStore' }    // ← DevTools 中的 store 名稱
  )
)`}</pre>
                </div>

                {/* immer */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-300">immer — 直接 Mutate State</h3>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface TodoState {
  todos: { id: number; text: string; done: boolean }[]
  toggle: (id: number) => void
}

export const useTodoStore = create<TodoState>()(
  immer((set) => ({
    todos: [],
    toggle: (id) =>
      set((state) => {
        // ✅ 可直接 mutate，Immer 負責產生新物件
        const todo = state.todos.find((t) => t.id === id)
        if (todo) todo.done = !todo.done
      }),
  }))
)`}</pre>
                </div>
            </section>

            {/* ── 5. Slice 模式 ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Slice 模式（拆分大型 Store）</h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm -mt-2">
                    當 store 逐漸龐大時，可將不同功能的 state 拆分為獨立的 slice function，再合併成一個 store，概念類似 Redux Toolkit 的 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-orange-700 dark:text-orange-300 text-xs">combineReducers</code>。
                </p>

                <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`import { create, StateCreator } from 'zustand'

// ── Slice A：計數器 ──
interface CounterSlice {
  count: number
  increment: () => void
}
const createCounterSlice: StateCreator<
  CounterSlice & UserSlice, [], [], CounterSlice
> = (set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
})

// ── Slice B：使用者 ──
interface UserSlice {
  username: string
  setUsername: (name: string) => void
}
const createUserSlice: StateCreator<
  CounterSlice & UserSlice, [], [], UserSlice
> = (set) => ({
  username: '',
  setUsername: (name) => set({ username: name }),
})

// ── 合併 ──
export const useBoundStore = create<CounterSlice & UserSlice>()((...a) => ({
  ...createCounterSlice(...a),
  ...createUserSlice(...a),
}))`}</pre>
            </section>

            {/* ── 6. 元件外使用 ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">在元件外讀寫 State</h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm -mt-2">
                    Zustand store 是普通的 JavaScript 模組，可直接在 API 工具函數、事件處理器或任何非元件的地方存取 state。
                </p>

                <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`import { useAuthStore } from '@/stores/useAuthStore'

// 在 API 攔截器中讀取 token（非 React 環境）
const token = useAuthStore.getState().token

// 在非同步函數中更新 state
async function logout() {
  await fetch('/api/logout', { method: 'POST' })
  useAuthStore.setState({ token: null, user: null })
}

// 訂閱 state 變化（不在 React 內）
const unsubscribe = useAuthStore.subscribe(
  (state) => state.token,
  (token) => {
    if (!token) redirectToLogin()
  }
)`}</pre>
            </section>

            {/* ── 7. Zustand vs Redux 比較 ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Zustand vs Redux Toolkit 比較</h2>
                <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-neutral-100 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300">
                            <tr>
                                <th className="px-5 py-3 font-semibold">項目</th>
                                <th className="px-5 py-3 font-semibold text-orange-600 dark:text-orange-300">Zustand</th>
                                <th className="px-5 py-3 font-semibold text-purple-600 dark:text-purple-300">Redux Toolkit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {[
                                ['Bundle size', '~1 KB', '~47 KB'],
                                ['Provider 需求', '不需要', '需要 &lt;Provider&gt;'],
                                ['樣板程式碼', '極少', '中等（已被 RTK 簡化）'],
                                ['非同步處理', '直接 async/await', 'createAsyncThunk'],
                                ['DevTools 支援', '需加 devtools middleware', '內建'],
                                ['持久化', 'persist middleware', 'redux-persist'],
                                ['學習曲線', '低', '中'],
                                ['適用場景', '中小型專案、需快速開發', '大型、多人協作專案'],
                            ].map(([item, zustand, redux]) => (
                                <tr key={item} className="bg-white dark:bg-neutral-900/30">
                                    <td className="px-5 py-3 font-medium text-neutral-700 dark:text-neutral-300">{item}</td>
                                    <td className="px-5 py-3 text-neutral-600 dark:text-neutral-400" dangerouslySetInnerHTML={{ __html: zustand }} />
                                    <td className="px-5 py-3 text-neutral-600 dark:text-neutral-400" dangerouslySetInnerHTML={{ __html: redux }} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ── 8. 常見陷阱 ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">常見陷阱</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-red-500 dark:text-red-400 mb-2 text-sm">訂閱整個 store</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-3">
                            直接呼叫 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs">useMyStore()</code>（不傳 selector）會訂閱<strong className="text-neutral-700 dark:text-neutral-300">所有欄位</strong>，任何更新都觸發重渲。
                        </p>
                        <pre className="bg-neutral-950 p-3 rounded-lg text-xs font-mono text-neutral-300 overflow-x-auto border border-neutral-800">{`// ❌ 整個 store，容易過度 re-render
const store = useMyStore()

// ✅ 只訂閱需要的欄位
const count = useMyStore((s) => s.count)`}</pre>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-red-500 dark:text-red-400 mb-2 text-sm">Selector 回傳新物件</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-3">
                            每次 render 都建立新物件參考，即使內容未變也會觸發重渲。搭配 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs">useShallow</code> 做淺比較。
                        </p>
                        <pre className="bg-neutral-950 p-3 rounded-lg text-xs font-mono text-neutral-300 overflow-x-auto border border-neutral-800">{`import { useShallow } from 'zustand/react/shallow'

// ❌ 每次都回傳新物件 → 永遠 re-render
const { a, b } = useStore((s) => ({ a: s.a, b: s.b }))

// ✅ useShallow 做淺比較
const { a, b } = useStore(useShallow((s) => ({ a: s.a, b: s.b })))`}</pre>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-red-500 dark:text-red-400 mb-2 text-sm">SSR 中的 store 共享問題</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            在 Next.js App Router 的 SSR 環境中，模組層級的 store 會在<strong className="text-neutral-700 dark:text-neutral-300">所有請求間共享</strong>，造成跨請求狀態汙染。需使用 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs">createStore</code> + Context 的模式隔離每個請求。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-red-500 dark:text-red-400 mb-2 text-sm">persist hydration 閃爍</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            使用 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs">persist</code> 時，SSR 階段 store 尚未從 localStorage 還原，會出現短暫不一致（hydration mismatch）。可用 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs">useStore.persist.hasHydrated()</code> 或掛載後才渲染特定 UI 解決。
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
