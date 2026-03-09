export const metadata = {
    title: '基礎與語法 | Dev Notes',
    description: 'TypeScript 與 React 的核心概念、Hooks 使用時機、JS 面試考點整理',
}

export default function SyntaxPage() {
    return (
        <div className="flex flex-col gap-12">
            <header>
                <h1 className="text-4xl font-bold mb-4 text-blue-400">基礎與語法</h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                    TypeScript、React Hooks 與 JavaScript 核心觀念整理，聚焦面試高頻考點與實際使用情境。
                </p>
            </header>

            {/* ── React Hooks ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">React Hooks</h2>

                {/* useState */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-1">useState — 不可變更新</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            直接 mutate state 物件不會觸發重新渲染。更新物件或陣列時，必須回傳新的參考（spread / filter / map）。
                            函數式更新（<code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">prev =&gt; ...</code>）可避免 stale closure 問題。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// ❌ 錯誤：直接 mutate，React 偵測不到 reference 改變
state.items.push(newItem)
setState(state)

// ✅ 正確：回傳新陣列
setState(prev => ({ ...prev, items: [...prev.items, newItem] }))

// ✅ 函數式更新：解決快速連點時的 stale state
setCount(prev => prev + 1)`}</pre>
                </div>

                {/* useEffect */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-1">useEffect — 依賴陣列與 Cleanup</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            依賴陣列決定 effect 的觸發時機。遺漏依賴會產生 stale closure；不必要的依賴會造成無限迴圈。
                            回傳的 cleanup function 會在<strong className="text-neutral-700 dark:text-neutral-300"> 下次 effect 執行前</strong>及元件卸載時執行。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`useEffect(() => {
  // 訂閱 WebSocket
  const ws = new WebSocket(url)
  ws.onmessage = (e) => setMessages(prev => [...prev, e.data])

  // Cleanup：元件卸載或 url 改變時，關閉舊連線
  return () => ws.close()
}, [url]) // url 改變 → 先 cleanup 舊的，再建立新的

// 常見陷阱：effect 內用到的所有外部變數都必須列入依賴
// ESLint plugin exhaustive-deps 可自動偵測`}</pre>
                </div>

                {/* useMemo / useCallback */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-1">useMemo vs useCallback</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            兩者都是快取機制，差別在於快取的東西：<code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">useMemo</code> 快取<strong className="text-neutral-700 dark:text-neutral-300">計算結果（値）</strong>，
                            <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">useCallback</code> 快取<strong className="text-neutral-700 dark:text-neutral-300">函數定義</strong>。
                            與 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">React.memo</code> 搽配使用，才能真正阻止子元件不必要的重渲染。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// useMemo：大量計算結果快取，避免每次 render 重算
const sortedList = useMemo(
  () => items.sort((a, b) => b.score - a.score),
  [items]
)

// useCallback：穩定的函數參考，搭配 React.memo 使用
const handleDelete = useCallback((id: string) => {
  setItems(prev => prev.filter(item => item.id !== id))
}, []) // 無外部依賴 → 永遠是同一個函數參考

// React.memo 只在 props 改變時才重渲染
const ItemRow = React.memo(({ item, onDelete }) => (
  <li onClick={() => onDelete(item.id)}>{item.name}</li>
))`}</pre>
                </div>

                {/* useRef */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-1">useRef — DOM 存取 vs 可變容器</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">useRef</code> 有兩個用途：取得 DOM 節點（如 focus、動畫）；以及儲存<strong className="text-neutral-700 dark:text-neutral-300">不影響渲染的可變値</strong>（如 timer id、前一次的値）。
                            修改 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">.current</code> 不會觸發重渲染。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// 用途 1：DOM 操作
const inputRef = useRef<HTMLInputElement>(null)
const focusInput = () => inputRef.current?.focus()

// 用途 2：儲存 timer id（修改不觸發 re-render）
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

const startTimer = () => {
  timerRef.current = setTimeout(() => console.log('done'), 1000)
}
const cancelTimer = () => {
  if (timerRef.current) clearTimeout(timerRef.current)
}`}</pre>
                </div>

                {/* Custom Hook */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-1">Custom Hook — 邏輯抽取與複用</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            Custom Hook 以 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">use</code> 開頭，可在其中使用任意 Hook。
                            適合將「狀態 + 副作用」打包成可測試、可複用的邏輯單元，元件只負責 UI 邏輯。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)

    fetch(url, { signal: controller.signal })
      .then(r => r.json())
      .then(setData)
      .catch(e => { if (e.name !== 'AbortError') setError(e) })
      .finally(() => setLoading(false))

    // Cleanup：path 改變時取消前一個請求（避免 race condition）
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}

// 使用：元件完全不感知 fetch 細節
const { data: user, loading } = useFetch<User>('/api/user/1')`}</pre>
                </div>
            </section>

            {/* ── TypeScript ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">TypeScript</h2>

                {/* type vs interface */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-300 mb-1">type vs interface</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            兩者大多數情況可互換。主要差異：<code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">interface</code> 支援 declaration merging（同名自動合併）；
                            <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">type</code> 可表達 Union、Intersection、Mapped types 等更複雜的組合。
                            物件形狀優先用 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">interface</code>，其餘用 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">type</code>。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// interface：可被 extend、可 declaration merging
interface User { id: string; name: string }
interface User { age: number }  // ✅ 自動合併為 { id, name, age }

// type：可組合 Union 與 Intersection
type Status = 'idle' | 'loading' | 'success' | 'error'
type AdminUser = User & { permissions: string[] }
type Nullable<T> = T | null`}</pre>
                </div>

                {/* Discriminated Union */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-300 mb-1">Discriminated Union — 型別縮窄</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            以共同的「判別屬性」（discriminant）讓 TypeScript 自動縮窄型別，取代 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">as</code> 強制轉型。
                            搽配 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">switch</code> 竮舉時，加入 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">never</code> 可確保所有分支都被處理。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`type ApiState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error';   error: string }

function render<T>(state: ApiState<T>) {
  switch (state.status) {
    case 'loading': return <Spinner />
    case 'success': return <View data={state.data} />  // TS 知道 data 存在
    case 'error':   return <Alert msg={state.error} />
    case 'idle':    return null
    default:
      // never：若未來新增 status 但忘記處理，編譯時期報錯
      const _exhaustive: never = state
      return _exhaustive
  }
}`}</pre>
                </div>

                {/* Generics */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-300 mb-1">Generics + Constraints</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            泛型搽配 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">extends</code> 約束，讓函數在保持彈性的同時仍有型別安全。
                            <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">keyof T</code> 取得物件所有 key 的聯合型別，是存取屬性時常用的技巧。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// keyof 約束：確保 key 是 T 的合法屬性
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { id: 1, name: 'Wilson', role: 'admin' }
getProperty(user, 'name')   // ✅ string
getProperty(user, 'email')  // ❌ 編譯錯誤

// 實際應用：型別安全的 API response wrapper
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}
async function fetchUser(): Promise<ApiResponse<User>> { ... }`}</pre>
                </div>

                {/* Utility Types */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-300 mb-1">Utility Types — 實際使用情境</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            TypeScript 內建的型別工具，用於衍生新型別，避免重複定義。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

// Partial：更新 API 的 request body（所有欄位可選）
type UpdateUserDto = Partial<Omit<User, 'id' | 'createdAt'>>

// Pick：只暴露給前端的安全欄位
type PublicUser = Pick<User, 'id' | 'name'>

// Record：建立 id → user 的查詢 map
type UserMap = Record<string, User>

// ReturnType / Parameters：從既有函數自動推導型別
type FetchResult = ReturnType<typeof useFetch>
type RouterParams = Parameters<typeof router.push>[0]`}</pre>
                </div>
            </section>

            {/* ── JavaScript 核心 ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">JavaScript 核心</h2>

                {/* Closure */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-green-600 dark:text-green-300 mb-1">Closure（閉包）</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            函數記住並持有其定義時所處作用域的變數，即使外部函數已執行完畢。
                            React 的 stale closure 問題本質上就是 effect 捕捉了過時的 state/props 參考。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// 典型應用：counter factory
function makeCounter(initial = 0) {
  let count = initial  // 被閉包捕捉的私有變數

  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  }
}
const c = makeCounter(10)
c.increment() // 11 — 外部無法直接存取 count，只能透過回傳的函數

// React stale closure 範例
function Timer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // ❌ 閉包捕捉了初始的 count = 0，每秒都 log 0
    const id = setInterval(() => console.log(count), 1000)
    return () => clearInterval(id)
  }, []) // 空依賴 → count 永遠是 0

  // ✅ 解法：加入 count 到依賴，或改用 functional update
}`}</pre>
                </div>

                {/* Event Loop */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-green-600 dark:text-green-300 mb-1">Event Loop — 執行順序</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            JS 是單執行緒，透過 Event Loop 處理非同步。<strong className="text-neutral-700 dark:text-neutral-300">Microtask queue</strong>（Promise.then、queueMicrotask）的優先權高於
                            <strong className="text-neutral-700 dark:text-neutral-300"> Macrotask queue</strong>（setTimeout、setInterval）。
                            每個 macrotask 執行完後，會先清空所有 microtask 再取下一個 macrotask。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`console.log('1')                          // 同步

setTimeout(() => console.log('2'), 0)    // macrotask

Promise.resolve()
  .then(() => console.log('3'))          // microtask
  .then(() => console.log('4'))          // microtask

console.log('5')                          // 同步

// 輸出順序：1 → 5 → 3 → 4 → 2
// 同步執行完 → 清空 microtask queue → 取 macrotask`}</pre>
                </div>

                {/* Debounce */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-green-600 dark:text-green-300 mb-1">Debounce vs Throttle</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            <strong className="text-neutral-700 dark:text-neutral-300">Debounce</strong>：停止觸發後等待 N ms 才執行，適合搜尋框（等用戶打完字再送 API）。
                            <strong className="text-neutral-700 dark:text-neutral-300">Throttle</strong>：每 N ms 最多執行一次，適合 scroll / resize（持續觸發但需要限制頻率）。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)                 // 每次觸發就重置計時
    timer = setTimeout(() => fn(...args), delay)
  }
}

// Custom Hook 版本（搭配 useEffect cleanup）
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)  // value 改變 → 取消上一個 timer
  }, [value, delay])
  return debounced
}

// 搜尋框：只有用戶停止輸入 300ms 後才發送請求
const debouncedQuery = useDebounce(searchInput, 300)
useEffect(() => { fetchResults(debouncedQuery) }, [debouncedQuery])`}</pre>
                </div>
            </section>
        </div>
    )
}