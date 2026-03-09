import React from 'react';

export default function ReduxPage() {
    return (
        <div className="flex flex-col gap-12">
            <header>
                <h1 className="text-4xl font-bold mb-4 text-purple-400">Redux 狀態管理</h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                    Redux Toolkit (RTK) 完整實戰：Store 設計、Slice、非同步 Thunk、RTK Query 與 Selector 最佳化。
                </p>
            </header>

            {/* ── 1. 核心概念 ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">核心概念</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">Store</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            整個應用的<strong className="text-neutral-700 dark:text-neutral-300">單一資料來源</strong>。由 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">configureStore</code> 建立，接收多個 reducer 組合成完整的 state 樹。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">Slice</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">createSlice</code> 將一個功能模組的 <strong className="text-neutral-700 dark:text-neutral-300">initialState、reducers、action creators</strong> 整合在一起，大幅減少樣板程式碼。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">Immer（自動 Immutable）</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            RTK 內建 Immer，reducer 中可以<strong className="text-neutral-700 dark:text-neutral-300">直接 mutate state</strong>（如 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">state.value += 1</code>），Immer 會在底層產生新的 immutable 物件，不需手動展開。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">Dispatch</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            呼叫 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">dispatch(action)</code> 將 action 送進 Store，Store 呼叫 reducer 計算新 state 並通知所有訂閱者（元件）重新 render。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">Selector</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            透過 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">useSelector</code> 從 Store 讀取資料。搭配 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">createSelector</code> 可做<strong className="text-neutral-700 dark:text-neutral-300"> memoized 衍生計算</strong>，避免不必要的重新 render。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">Middleware</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            位於 dispatch → reducer 之間的擴充層。RTK 預設加入 <strong className="text-neutral-700 dark:text-neutral-300">redux-thunk</strong>（處理非同步） 和 serializability check。可透過 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">getDefaultMiddleware</code> 追加自訂 middleware。
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 2. 完整初始設定 ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">完整初始設定（TypeScript）</h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm -mt-2">
                    RTK 與 TypeScript 整合的標準檔案結構，匯出型別化的 hooks 供全專案使用。
                </p>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-300">store.ts — 建立 Store 並匯出型別</h3>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import userReducer from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
})

// 從 store 推導出全域 RootState 型別，不需手動維護
export type RootState = ReturnType<typeof store.getState>
// AppDispatch 保留 thunk 型別資訊
export type AppDispatch = typeof store.dispatch`}</pre>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-300">hooks.ts — 型別化的 useAppSelector / useAppDispatch</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        專案中<strong className="text-neutral-700 dark:text-neutral-300">永遠使用這兩個 hook</strong>，而非直接用 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">useSelector</code> / <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">useDispatch</code>，確保型別安全。
                    </p>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// 使用 useAppDispatch 才能讓 dispatch(thunk) 有正確的型別
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()`}</pre>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-300">Provider — 掛載到 React 根元件</h3>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// app/layout.tsx 或 _app.tsx
import { Provider } from 'react-redux'
import { store } from '@/lib/store'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}`}</pre>
                </div>
            </section>

            {/* ── 3. createSlice 深入 ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">createSlice 深入</h2>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-300">initialState 型別設計 + 完整 Slice</h3>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Todo {
  id: string
  text: string
  completed: boolean
}

interface TodoState {
  items: Todo[]
  filter: 'all' | 'active' | 'completed'
}

const initialState: TodoState = {
  items: [],
  filter: 'all',
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      // prepare callback：在存入 state 前先加工 payload
      reducer(state, action: PayloadAction<Todo>) {
        state.items.push(action.payload)
      },
      prepare(text: string) {
        return {
          payload: { id: crypto.randomUUID(), text, completed: false },
        }
      },
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.items.find((t) => t.id === action.payload)
      if (todo) todo.completed = !todo.completed   // Immer 允許直接 mutate
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
    setFilter(state, action: PayloadAction<TodoState['filter']>) {
      state.filter = action.payload
    },
    // 重置整個 slice 狀態
    resetTodos: () => initialState,
  },
})

export const { addTodo, toggleTodo, removeTodo, setFilter, resetTodos } = todoSlice.actions
export default todoSlice.reducer`}</pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">reducers</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            定義<strong className="text-neutral-700 dark:text-neutral-300">同步</strong> action。每個 key 自動產生對應的 action creator，呼叫時傳入的參數即為 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">action.payload</code>。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">extraReducers</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            回應<strong className="text-neutral-700 dark:text-neutral-300">其他 slice 或 thunk</strong> 產生的 action，通常用來處理 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">createAsyncThunk</code> 的三個狀態。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">prepare callback</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            在 payload 存入 reducer 前對其加工，例如產生 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">id</code>、加上 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">timestamp</code> 等，讓 reducer 保持 pure function。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">重置 reset 技巧</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">resetTodos: {`() => initialState`}</code>：直接回傳 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">initialState</code> 替換掉整個 slice state，不需展開。
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 4. createAsyncThunk ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">createAsyncThunk — 非同步資料流</h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm -mt-2">
                    RTK 內建的非同步 action 工具，自動產生 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">pending</code> / <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">fulfilled</code> / <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">rejected</code> 三個 action，並與 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">extraReducers</code> 搭配處理 loading / error / data 狀態。
                </p>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-300">1. 定義 Thunk + 完整 Slice（含 loading state）</h3>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface User {
  id: number
  name: string
  email: string
}

interface UserState {
  data: User | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UserState = { data: null, status: 'idle', error: null }

// createAsyncThunk<回傳型別, 參數型別>
export const fetchUser = createAsyncThunk<User, number>(
  'user/fetchById',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(\`/api/users/\${userId}\`)
      if (!res.ok) throw new Error('Server error')
      return (await res.json()) as User
    } catch (err) {
      // rejectWithValue 讓 rejected.payload 有型別（非 Error 物件）
      return rejectWithValue((err as Error).message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => { state.data = null; state.status = 'idle' },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload        // 型別安全：User
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string ?? 'Unknown error'
      })
  },
})

export const { clearUser } = userSlice.actions
export default userSlice.reducer`}</pre>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-300">2. 在元件中 dispatch Thunk + 處理 UI 狀態</h3>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`'use client'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchUser } from '@/lib/features/user/userSlice'

export default function UserProfile({ userId }: { userId: number }) {
  const dispatch = useAppDispatch()
  const { data, status, error } = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [dispatch, userId])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p className="text-red-500">{error}</p>
  if (!data) return null

  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
    </div>
  )
}`}</pre>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-3">取消 Thunk（AbortController）</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-3">
                        <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">dispatch(thunk)</code> 回傳一個帶有 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">.abort()</code> 方法的 Promise，搭配 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">signal</code> 參數可在元件 unmount 時取消進行中的請求，防止 race condition。
                    </p>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// thunk 內部
async (userId, { signal }) => {
  const res = await fetch(\`/api/users/\${userId}\`, { signal })
  ...
}

// 元件中
useEffect(() => {
  const promise = dispatch(fetchUser(userId))
  return () => promise.abort()   // unmount 時取消
}, [dispatch, userId])`}</pre>
                </div>
            </section>

            {/* ── 5. RTK Query ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">RTK Query — 資料請求與快取</h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm -mt-2">
                    RTK Query 是 RTK 內建的強力資料請求解決方案，自動處理<strong className="text-neutral-700 dark:text-neutral-300"> loading / caching / refetching / invalidation</strong>，大幅減少手寫 thunk + extraReducers 的樣板。
                </p>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-300">1. 定義 API Slice（apiSlice.ts）</h3>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Post { id: number; title: string; body: string }

export const postsApi = createApi({
  reducerPath: 'postsApi',   // store 裡的 key
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],         // 用於 cache invalidation

  endpoints: (builder) => ({
    // query：GET 請求
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => \`/posts/\${id}\`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    // mutation：POST / PUT / DELETE
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({ url: '/posts', method: 'POST', body }),
      // 建立成功後，使所有 'Post' 快取失效 → 自動 refetch
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({ url: \`/posts/\${id}\`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
})

// 自動產生的 hooks
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsApi`}</pre>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-300">2. 將 RTK Query reducer 加入 Store</h3>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`import { configureStore } from '@reduxjs/toolkit'
import { postsApi } from './features/posts/apiSlice'

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,  // RTK Query 管理的快取
    // ...其他 slice reducer
  },
  // 加入 RTK Query middleware（負責快取生命週期管理）
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
})`}</pre>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-300">3. 在元件中使用（自動快取）</h3>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`'use client'
import {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} from '@/lib/features/posts/apiSlice'

export default function PostList() {
  // 自動 fetch、快取、loading/error 狀態一次搞定
  const { data: posts, isLoading, isError, refetch } = useGetPostsQuery()

  const [createPost, { isLoading: isCreating }] = useCreatePostMutation()
  const [deletePost] = useDeletePostMutation()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <button onClick={refetch}>重試</button>

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>
          {post.title}
          <button onClick={() => deletePost(post.id)}>刪除</button>
        </li>
      ))}
      <button
        disabled={isCreating}
        onClick={() => createPost({ title: 'New Post', body: '...' })}
      >
        新增
      </button>
    </ul>
  )
}`}</pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">providesTags / invalidatesTags</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            Cache invalidation 機制。mutation 執行後帶有<strong className="text-neutral-700 dark:text-neutral-300"> invalidatesTags</strong>，所有 query 中標記了相符 <strong className="text-neutral-700 dark:text-neutral-300">providesTags</strong> 的快取會被清除並自動重新請求。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">Polling（輪詢）</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">{'useGetPostsQuery(undefined, { pollingInterval: 30000 })'}</code>：每 30 秒自動 refetch，適合需要即時更新的場景，無需手動 setInterval。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">Skip 與條件式請求</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">{'useGetPostByIdQuery(id, { skip: !id })'}</code>：當 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">id</code> 為 falsy 時跳過請求，避免多餘 API 呼叫。
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">vs createAsyncThunk</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">
                            <strong className="text-neutral-700 dark:text-neutral-300">RTK Query</strong> 適合標準 CRUD API（自動快取、去重複請求）；<strong className="text-neutral-700 dark:text-neutral-300">createAsyncThunk</strong> 適合複雜非同步副作用（WebSocket、批次操作、依賴其他 state 的邏輯）。
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 6. createSelector ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">createSelector — Memoized Selector</h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm -mt-2">
                    來自 Reselect 库（RTK 已內建），透過 memoization 避免 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-purple-700 dark:text-purple-300 text-xs">useSelector</code> 每次 render 都重新計算衍生資料，有效減少不必要的 re-render。
                </p>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-300">基礎用法 vs 問題場景</h3>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'

// ❌ 每次 render 都重算，產生新陣列 → 元件必然 re-render
const badSelector = (state: RootState) =>
  state.todos.items.filter((t) => t.completed)

// ✅ createSelector：只有在 state.todos.items 或 state.todos.filter 變更時才重算
const selectTodosItems = (state: RootState) => state.todos.items
const selectFilter = (state: RootState) => state.todos.filter

export const selectFilteredTodos = createSelector(
  [selectTodosItems, selectFilter],          // input selectors
  (items, filter) => {                        // result function（memoized）
    if (filter === 'all') return items
    return items.filter((t) =>
      filter === 'completed' ? t.completed : !t.completed
    )
  }
)

// 帶參數的 selector（工廠模式，每個元件有獨立 memoize 快取）
export const makeSelectTodoById = () =>
  createSelector(
    [(state: RootState) => state.todos.items, (_: RootState, id: string) => id],
    (items, id) => items.find((t) => t.id === id)
  )

// 在元件中
const filteredTodos = useAppSelector(selectFilteredTodos)

// 工廠模式使用
const selectTodoById = useMemo(makeSelectTodoById, [])
const todo = useAppSelector((state) => selectTodoById(state, todoId))`}</pre>
                </div>
            </section>

            {/* ── 7. 資料流全覽 ── */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Redux 資料流全覽</h2>

                <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                    <pre className="text-sm font-mono text-neutral-500 dark:text-neutral-400 overflow-x-auto leading-loose">{`UI 互動
  │
  ▼  dispatch(action) / dispatch(thunk)
Middleware（redux-thunk、logger 等）
  │  同步 action 直接到 Reducer
  │  非同步 thunk 執行副作用後再 dispatch action
  ▼
Reducer（createSlice reducers / extraReducers）
  │  pure function：(currentState, action) => newState
  │  Immer 讓你寫 mutating 語法，底層仍產生新物件
  ▼
Store（單一 state 樹）
  │  state 更新後通知所有 useSelector 訂閱者
  ▼
useSelector（+ createSelector memoization）
  │  只有選取的資料真正變化才觸發 re-render
  ▼
UI 重新渲染`}</pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">適合放入 Redux</h3>
                        <ul className="text-sm text-neutral-600 dark:text-neutral-500 space-y-1 list-disc list-inside">
                            <li>多元件共享的全域狀態</li>
                            <li>伺服器資料快取（RTK Query）</li>
                            <li>使用者認證 / 權限資訊</li>
                            <li>複雜的跨元件互動狀態</li>
                        </ul>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">不適合放入 Redux</h3>
                        <ul className="text-sm text-neutral-600 dark:text-neutral-500 space-y-1 list-disc list-inside">
                            <li>本地 UI 狀態（modal 開關）</li>
                            <li>表單暫存輸入值</li>
                            <li>只有單一元件使用的資料</li>
                            <li>可從其他 state 衍生的資料</li>
                        </ul>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">效能最佳化要點</h3>
                        <ul className="text-sm text-neutral-600 dark:text-neutral-500 space-y-1 list-disc list-inside">
                            <li>使用 createSelector memoize 衍生資料</li>
                            <li>Selector 顆粒度要細（避免選整個 slice）</li>
                            <li>mutation 用 RTK Query 取代手寫 thunk</li>
                            <li>搭配 React.memo 減少子元件 re-render</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}