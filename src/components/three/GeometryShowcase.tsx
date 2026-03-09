'use client'
// 旋轉幾何體展示台：可切換形狀，具備環境光暈與自動旋轉
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

type ShapeType = 'box' | 'sphere' | 'torus' | 'octahedron'

function Shape({ type }: { type: ShapeType }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.4
            meshRef.current.rotation.x += delta * 0.15
        }
    })

    const geometry = () => {
        switch (type) {
            case 'box': return <boxGeometry args={[1.5, 1.5, 1.5]} />
            case 'sphere': return <sphereGeometry args={[1, 64, 64]} />
            case 'torus': return <torusGeometry args={[1, 0.4, 32, 100]} />
            case 'octahedron': return <octahedronGeometry args={[1.3]} />
        }
    }

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                {geometry()}
                <meshStandardMaterial
                    color="#818cf8"
                    emissive="#4f46e5"
                    emissiveIntensity={0.4}
                    metalness={0.7}
                    roughness={0.15}
                />
            </mesh>
        </Float>
    )
}

const shapes: { type: ShapeType; label: string }[] = [
    { type: 'box', label: 'Box' },
    { type: 'sphere', label: 'Sphere' },
    { type: 'torus', label: 'Torus' },
    { type: 'octahedron', label: 'Octahedron' },
]

export default function GeometryShowcase() {
    const [active, setActive] = useState<ShapeType>('sphere')

    return (
        <div className="flex flex-col gap-4">
            {/* 控制列 */}
            <div className="flex gap-2 flex-wrap">
                {shapes.map(({ type, label }) => (
                    <button
                        key={type}
                        onClick={() => setActive(type)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${active === type
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* 3D Canvas */}
            <div className="h-72 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950">
                <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                    <ambientLight intensity={0.4} />
                    <pointLight position={[5, 5, 5]} intensity={80} color="#818cf8" />
                    <pointLight position={[-5, -5, -5]} intensity={40} color="#ec4899" />
                    <directionalLight position={[0, 5, 2]} intensity={1} />
                    <Shape type={active} />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>
            <p className="text-xs text-neutral-600 text-center">可拖曳旋轉 · 點擊按鈕切換幾何體</p>
        </div>
    )
}
