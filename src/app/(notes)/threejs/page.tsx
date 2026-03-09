import { GeometryShowcaseDynamic as GeometryShowcase, ParticleWaveDynamic as ParticleWave } from '@/components/three/ThreeClientComponents'

export const metadata = {
    title: 'Three.js 3D 渲染 | Dev Notes',
    description: 'WebGL 與 Three.js 的 3D 場景開發、React Three Fiber 互動展示、材質光影與粒子效果',
}

export default function ThreeJsPage() {
    return (
        <div className="flex flex-col gap-12">
            <header>
                <h1 className="text-4xl font-bold mb-4 text-green-400">Three.js 3D 渲染</h1>
                <p className="text-neutral-400 text-lg">
                    WebGL 與 Three.js 的 3D 場景開發、材質光影與互動效果。以下為使用 React Three Fiber 實作的互動展示。
                </p>
            </header>

            {/* Demo 1：幾何體展示台 */}
            <section className="flex flex-col gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-100 mb-1">幾何體展示台</h2>
                    <p className="text-neutral-500 text-sm">
                        使用 <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-green-300 text-xs">MeshDistortMaterial</code> + <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-green-300 text-xs">Float</code> + <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-green-300 text-xs">Environment</code> 實現細緻光影與漂浮動態。
                    </p>
                </div>
                <GeometryShowcase />
            </section>

            {/* Demo 2：粒子波浪場 */}
            <section className="flex flex-col gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-100 mb-1">粒子波浪場</h2>
                    <p className="text-neutral-500 text-sm">
                        以 <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-green-300 text-xs">BufferGeometry</code> 管理 3,600 個頂點，每幀透過正弦函數計算高度，並以滑鼠位置作為相位偏移輸入。
                    </p>
                </div>
                <ParticleWave />
            </section>

            {/* 核心概念筆記 */}
            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-neutral-100">核心概念</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { title: 'Geometry', desc: '幾何體建構。BoxGeometry、SphereGeometry、BufferGeometry（自訂頂點）。', color: 'text-green-300' },
                        { title: 'Material', desc: 'MeshStandardMaterial 受光照影響；MeshDistortMaterial 加入形變動態。', color: 'text-blue-300' },
                        { title: 'Light', desc: 'AmbientLight 環境光；PointLight 點光源；DirectionalLight 平行光。', color: 'text-yellow-300' },
                        { title: 'useFrame', desc: 'R3F 的 render loop hook，每幀觸發，可用 delta 做幀率無關的動畫。', color: 'text-purple-300' },
                        { title: 'BufferAttribute', desc: '直接操作 GPU 頂點資料，效能遠優於每幀新建幾何體。', color: 'text-pink-300' },
                        { title: 'dynamic import', desc: 'Three.js 依賴 Browser API，必須以 ssr: false 避免 Next.js SSR 錯誤。', color: 'text-orange-300' },
                    ].map(({ title, desc, color }) => (
                        <div key={title} className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
                            <h3 className={`font-medium mb-2 ${color}`}>{title}</h3>
                            <p className="text-sm text-neutral-500">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* R3F 基本範例 */}
            <section className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50">
                <h2 className="text-2xl font-semibold mb-4 text-neutral-200">React Three Fiber 基本場景</h2>
                <p className="text-neutral-400 mb-4 text-sm">
                    R3F 是 Three.js 的 React renderer，以宣告式語法撰寫 3D 場景，並與 React 生命週期完整整合。
                </p>
                <pre className="bg-neutral-950 p-5 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">
                    {`import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function RotatingBox() {
  const meshRef = useRef()

  // 每幀更新旋轉，delta 確保不同幀率下速度一致
  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#818cf8" metalness={0.8} roughness={0.1} />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />
      <RotatingBox />
      <OrbitControls />
    </Canvas>
  )
}`}
                </pre>
            </section>
        </div>
    )
}