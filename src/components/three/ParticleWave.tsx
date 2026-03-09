'use client'
// 粒子波浪場：滑鼠移動影響波浪振幅與方向
import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const GRID = 60
const SPREAD = 8

function ParticleWave() {
    const meshRef = useRef<THREE.Points>(null)
    const { mouse } = useThree()

    // 預先建立網格座標
    const [positions, originalY] = useMemo(() => {
        const count = GRID * GRID
        const pos = new Float32Array(count * 3)
        const origY = new Float32Array(count)
        let i = 0
        for (let ix = 0; ix < GRID; ix++) {
            for (let iz = 0; iz < GRID; iz++) {
                const x = (ix / GRID - 0.5) * SPREAD
                const z = (iz / GRID - 0.5) * SPREAD
                pos[i * 3] = x
                pos[i * 3 + 1] = 0
                pos[i * 3 + 2] = z
                origY[i] = 0
                i++
            }
        }
        return [pos, origY]
    }, [])

    useFrame(({ clock }) => {
        if (!meshRef.current) return
        const t = clock.getElapsedTime()
        const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
        const mx = mouse.x * 2
        const my = mouse.y * 2

        for (let i = 0; i < GRID * GRID; i++) {
            const x = posAttr.getX(i)
            const z = posAttr.getZ(i)
            // 波浪高度受滑鼠位置影響
            const wave = Math.sin((x + mx) * 1.5 + t) * Math.cos((z + my) * 1.5 + t) * 0.6
            posAttr.setY(i, wave)
        }
        posAttr.needsUpdate = true
    })

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#38bdf8"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    )
}

export default function ParticleWaveScene() {
    return (
        <div className="flex flex-col gap-2">
            <div className="h-72 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950">
                <Canvas camera={{ position: [0, 4, 6], fov: 55 }}>
                    <ambientLight intensity={0.3} />
                    <ParticleWave />
                </Canvas>
            </div>
            <p className="text-xs text-neutral-600 text-center">移動滑鼠影響波浪方向 · {GRID * GRID} 個粒子即時運算</p>
        </div>
    )
}
