import React from 'react';

export default function ReduxPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-4xl font-bold mb-4 text-purple-400">Redux 狀態管理</h1>
                <p className="text-neutral-400 text-lg">
                    Redux Toolkit (RTK) 實戰應用、Store 設計與非同步資料流處理。
                </p>
            </header>

            <section className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50">
                <h2 className="text-2xl font-semibold mb-6 text-neutral-200">核心概念</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                        <h3 className="font-medium text-purple-300 mb-2">Store</h3>
                        <p className="text-sm text-neutral-500">單一資料來源，保存全域狀態。</p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                        <h3 className="font-medium text-purple-300 mb-2">Slices</h3>
                        <p className="text-sm text-neutral-500">使用 createSlice 定義 Reducer 與 Action。</p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                        <h3 className="font-medium text-purple-300 mb-2">Dispatch</h3>
                        <p className="text-sm text-neutral-500">發送 Action 來觸發狀態更新。</p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                        <h3 className="font-medium text-purple-300 mb-2">Selector</h3>
                        <p className="text-sm text-neutral-500">從 Store 中選取需要的資料。</p>
                    </div>
                </div>
            </section>

            <section className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50">
                <h2 className="text-2xl font-semibold mb-6 text-neutral-200">Quick Start (RTK)</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-purple-300 mb-2">1. 定義 Slice</h3>
                        <pre className="bg-neutral-950 p-4 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800">
                            {`import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;`}
                        </pre>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-purple-300 mb-2">2. 在元件中使用</h3>
                        <pre className="bg-neutral-950 p-4 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800">
                            {`const count = useSelector((state: RootState) => state.counter.value);
const dispatch = useDispatch();

// 觸發更新
<button onClick={() => dispatch(increment())}>+</button>`}
                        </pre>
                    </div>
                </div>
            </section>
        </div>
    );
}