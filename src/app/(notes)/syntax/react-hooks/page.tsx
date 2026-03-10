import ViewCounter from '@/components/ViewCounter';

export const metadata = {
  title: 'React Hooks | 基礎與語法 | Dev Notes',
  description: 'React Hooks 核心觀念、使用時機、常見陷阱與 Custom Hook 實作整理',
}

export default function ReactHooksPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-4xl font-bold mb-4 text-blue-400">React Hooks</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-lg">
          各 Hook 的使用時機、底層行為與常見陷阱，以及 Custom Hook 的設計原則。
        </p>
        <ViewCounter slug="syntax/react-hooks" />
      </header>

      {/* ── 使用規則 ── */}
      <section className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-3">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Rules of Hooks</h2>
        <ul className="flex flex-col gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <li className="flex gap-2"><span className="text-blue-400 font-mono shrink-0">1.</span>只能在 React 函數元件或 Custom Hook 的<strong className="text-neutral-800 dark:text-neutral-200"> 頂層</strong>呼叫，不可在條件式、迴圈或巢狀函數中呼叫。</li>
          <li className="flex gap-2"><span className="text-blue-400 font-mono shrink-0">2.</span>React 依靠<strong className="text-neutral-800 dark:text-neutral-200"> Hook 的呼叫順序</strong>來對應每個 useState/useEffect 的狀態，順序不一致會導致 bug。</li>
          <li className="flex gap-2"><span className="text-blue-400 font-mono shrink-0">3.</span>ESLint plugin <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">eslint-plugin-react-hooks</code> 可自動強制執行這些規則。</li>
        </ul>
      </section>

      {/* ── useState ── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">useState</h2>

        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-1">非同步更新 + 批次處理（Batching）</h3>
            <p className="text-neutral-600 dark:text-neutral-500 text-sm">
              <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">setState</code> 不會立即更新，React 會將同一個事件處理函數中的多次 setState <strong className="text-neutral-700 dark:text-neutral-300">批次合併</strong>，只觸發一次重渲染。
              React 18 起，非同步函數（setTimeout、fetch callback）中的 setState 也會自動批次。
            </p>
          </div>
          <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`function handleClick() {
  setCount(c => c + 1)  // 不會立即更新
  setCount(c => c + 1)  // 仍基於最新的 prev，最終 +2
  setFlag(f => !f)
  // React 將以上三次合併 → 只觸發一次 re-render
}

// ⚠️ 直接讀 state 無法取得最新值
function handleClickBug() {
  setCount(count + 1)
  setCount(count + 1)  // count 還是舊值 → 最終只 +1
}`}</pre>
        </div>

        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-1">物件與陣列狀態的不可變更新</h3>
            <p className="text-neutral-600 dark:text-neutral-500 text-sm">
              React 以 <strong className="text-neutral-700 dark:text-neutral-300">淺比較（Object.is）</strong>判斷 state 是否改變。直接 mutate 不會改變參考，React 不會偵測到變化。
            </p>
          </div>
          <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// 物件更新：spread 建立新參考
setUser(prev => ({ ...prev, name: 'Wilson' }))

// 陣列：新增
setList(prev => [...prev, newItem])

// 陣列：刪除
setList(prev => prev.filter(item => item.id !== id))

// 陣列：修改特定 item
setList(prev => prev.map(item =>
  item.id === id ? { ...item, done: true } : item
))`}</pre>
        </div>
      </section>

      {/* ── useEffect ── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">useEffect</h2>

        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-1">依賴陣列三種模式</h3>
          </div>
          <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// 1. 不傳依賴陣列：每次 render 後都執行（幾乎不用）
useEffect(() => { ... })

// 2. 空陣列：只在 mount 時執行一次
useEffect(() => { fetchInitialData() }, [])

// 3. 有依賴：依賴改變時重新執行
useEffect(() => {
  fetchUser(userId)
}, [userId])`}</pre>
        </div>

        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-1">Race Condition — fetch 的常見 bug</h3>
            <p className="text-neutral-600 dark:text-neutral-500 text-sm">
              用戶快速切換 userId 時，舊請求可能比新請求<strong className="text-neutral-700 dark:text-neutral-300">晩回來</strong>，導致畫面顯示錯誤資料。
              透過 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">AbortController</code> 在 cleanup 中取消過時的請求。
            </p>
          </div>
          <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`useEffect(() => {
  const controller = new AbortController()

  fetch(\`/api/users/\${userId}\`, { signal: controller.signal })
    .then(r => r.json())
    .then(setUser)
    .catch(e => {
      // AbortError 是預期行為，不需要顯示錯誤
      if (e.name !== 'AbortError') setError(e)
    })

  // Cleanup：userId 改變 → 取消前一個尚未完成的請求
  return () => controller.abort()
}, [userId])`}</pre>
        </div>
      </section>

      {/* ── useReducer ── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">useReducer</h2>

        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-1">何時選 useReducer 而非 useState</h3>
            <p className="text-neutral-600 dark:text-neutral-500 text-sm">
              當狀態之間有相依關係，或下一個狀態依賴多個既有狀態時，<code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">useReducer</code> 能讓邏輯集中、可測試。
              等同於 Redux 的局部版本。
            </p>
          </div>
          <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: User[] }
  | { type: 'FETCH_ERROR'; error: string }

type State = { loading: boolean; data: User[]; error: string | null }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { loading: false, data: action.payload, error: null }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error }
  }
}

// 使用
const [state, dispatch] = useReducer(reducer, { loading: false, data: [], error: null })
dispatch({ type: 'FETCH_START' })`}</pre>
        </div>
      </section>

      {/* ── useContext ── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">useContext</h2>

        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-1">Context + Custom Hook 封裝模式</h3>
            <p className="text-neutral-600 dark:text-neutral-500 text-sm">
              Context 解決深層 prop drilling。將 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">createContext</code> + Provider + <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">useContext</code> 封裝成一個 Custom Hook，
              消費端不需要知道 Context 的實作細節，也能確保在 Provider 外使用時及早拋錯。
            </p>
          </div>
          <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`interface AuthContextValue {
  user: User | null
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (credentials: Credentials) => {
    const user = await api.login(credentials)
    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout: () => setUser(null) }}>
      {children}
    </AuthContext.Provider>
  )
}

// 封裝成 Custom Hook，消費端呼叫更直觀
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

// 使用
const { user, login } = useAuth()`}</pre>
        </div>
      </section>

      {/* ── Custom Hooks ── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Custom Hooks 設計原則</h2>

        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-1">useLocalStorage — 狀態持久化</h3>
            <p className="text-neutral-600 dark:text-neutral-500 text-sm">
              將 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">localStorage</code> 的讀寫與 React state 同步封裝起來，
              並處理 SSR 環境下 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">window</code> 不存在的問題。
            </p>
          </div>
          <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    // lazy initializer：僅在 mount 時執行一次
    if (typeof window === 'undefined') return initialValue
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  const set = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const resolved = typeof newValue === 'function'
        ? (newValue as (prev: T) => T)(prev)
        : newValue
      localStorage.setItem(key, JSON.stringify(resolved))
      return resolved
    })
  }, [key])

  return [value, set] as const
}

// 使用：與 useState 介面完全相同
const [theme, setTheme] = useLocalStorage('theme', 'dark')`}</pre>
        </div>
      </section>
    </div>
  )
}
