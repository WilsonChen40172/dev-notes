import { GeometryShowcaseDynamic as GeometryShowcase, ParticleWaveDynamic as ParticleWave } from '@/components/three/ThreeClientComponents'
import ViewCounter from '@/components/ViewCounter'

export const metadata = {
    title: 'Three.js 3D 渲染 | Dev Notes',
    description: 'WebGL 與 Three.js 的 3D 場景開發、React Three Fiber 互動展示、材質光影與粒子效果',
}

export default function ThreeJsPage() {
    return (
        <div className="flex flex-col gap-12">
            <header>
                <h1 className="text-4xl font-bold mb-4 text-green-400">Three.js 3D 渲染</h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                    WebGL 與 Three.js 的 3D 場景開發、材質光影與互動效果。以下為使用 React Three Fiber 實作的互動展示。
                </p>
                <ViewCounter slug="threejs" />
            </header>

            {/* Demo 1：幾何體展示台 */}
            <section className="flex flex-col gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-100 mb-1">幾何體展示台</h2>
                    <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                        使用 <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-green-700 dark:text-green-300 text-xs">Float</code> 實現漂浮動態，搭配多組 <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-green-700 dark:text-green-300 text-xs">PointLight</code> 產生彩色反射光影，<code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-green-700 dark:text-green-300 text-xs">OrbitControls</code> 支援拖曳與自動旋轉。
                    </p>
                </div>
                <GeometryShowcase />
            </section>

            {/* Demo 2：粒子波浪場 */}
            <section className="flex flex-col gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">粒子波浪場</h2>
                    <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                        以 <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-green-700 dark:text-green-300 text-xs">BufferGeometry</code> 管理 3,600 個頂點，每幀透過正弦函數計算高度，並以滑鼠位置作為相位偏移輸入，效能優於每幀重建幾何體。
                    </p>
                </div>
                <ParticleWave />
            </section>

            {/* 實作筆記 */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">實作筆記</h2>

                {/* BufferAttribute 每幀更新 */}
                <div className="flex flex-col gap-3">
                    <div>
                        <h3 className="text-lg font-semibold text-sky-600 dark:text-sky-300 mb-1">BufferAttribute 直接操作頂點（粒子波浪）</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            避免每幀重建 Geometry 造成 GC 壓力。直接取出 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">position</code> attribute，原地修改 Y 值後標記 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">needsUpdate = true</code>，讓 Three.js 僅上傳變動的 buffer 至 GPU。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`useFrame(({ clock }) => {
  const t = clock.getElapsedTime()
  const posAttr = meshRef.current.geometry.attributes.position

  for (let i = 0; i < GRID * GRID; i++) {
    const x = posAttr.getX(i)
    const z = posAttr.getZ(i)
    // 滑鼠位置(mouse.x/y)作為相位偏移，讓波浪跟隨游標
    const wave = Math.sin((x + mouse.x * 2) * 1.5 + t)
              * Math.cos((z + mouse.y * 2) * 1.5 + t) * 0.6
    posAttr.setY(i, wave)
  }
  posAttr.needsUpdate = true  // 僅通知 GPU 更新，不重新分配記憶體
})`}</pre>
                </div>

                {/* Next.js SSR 處理 */}
                <div className="flex flex-col gap-3">
                    <div>
                        <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-300 mb-1">Next.js SSR 相容：dynamic import + ssr: false</h3>
                        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                            Three.js 直接存取 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">window</code> / WebGL context，在 Node.js 環境會崩潰。透過 dynamic import 延遲至瀏覽器載入，並將 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">ssr: false</code> 的呼叫包在 <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-green-700 dark:text-green-300 text-xs">{"'use client'"}</code> Client Component 中，避免 Next.js App Router 的限制。
                        </p>
                    </div>
                    <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">{`// ThreeClientComponents.tsx  ('use client' 必要)
import dynamic from 'next/dynamic'

// ssr: false 只能在 Client Component 中使用
export const GeometryShowcaseDynamic = dynamic(
  () => import('./GeometryShowcase'),
  { ssr: false, loading: () => <div className="h-72 animate-pulse bg-neutral-900 rounded-2xl" /> }
)

// Server Component 直接 import 此檔案即可，無需感知 Three.js
`}</pre>
                </div>
            </section>
        </div>
    )
}