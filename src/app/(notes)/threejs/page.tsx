import React from 'react';

export default function ThreeJsPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-4xl font-bold mb-4 text-green-400">Three.js 3D 渲染</h1>
                <p className="text-neutral-400 text-lg">
                    WebGL 與 Three.js 的 3D 場景開發、材質光影與互動效果筆記。
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
                    <h3 className="font-medium text-green-300 mb-2">Geometry</h3>
                    <p className="text-sm text-neutral-500">幾何體建構，如 BoxGeometry, SphereGeometry。</p>
                </div>
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
                    <h3 className="font-medium text-green-300 mb-2">Material</h3>
                    <p className="text-sm text-neutral-500">材質設定，如 MeshStandardMaterial (受光照影響)。</p>
                </div>
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
                    <h3 className="font-medium text-green-300 mb-2">Light</h3>
                    <p className="text-sm text-neutral-500">光照系統，AmbientLight (環境光), PointLight (點光源)。</p>
                </div>
            </div>

            <section className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50">
                <h2 className="text-2xl font-semibold mb-6 text-neutral-200">React Three Fiber (R3F)</h2>
                <p className="text-neutral-400 mb-4">
                    R3F 是 Three.js 的 React renderer，讓我們可以用宣告式的方式寫 3D 場景。
                </p>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-green-300 mb-2">基本場景範例</h3>
                        <pre className="bg-neutral-950 p-4 rounded-lg text-sm font-mono text-neutral-300 overflow-x-auto border border-neutral-800">
                            {`import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default function Scene() {
  return (
    <div className="h-screen">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box />
        <OrbitControls />
      </Canvas>
    </div>
  )
}`}
                        </pre>
                    </div>
                </div>
            </section>
        </div>
    );
}