'use client'
import dynamic from 'next/dynamic'

function CanvasPlaceholder() {
    return (
        <div className="h-72 rounded-2xl border border-neutral-800 bg-neutral-950 flex items-center justify-center">
            <span className="text-neutral-600 text-sm">載入場景中…</span>
        </div>
    )
}

// ssr: false 只能在 Client Component 中使用
export const GeometryShowcaseDynamic = dynamic(
    () => import('@/components/three/GeometryShowcase'),
    { ssr: false, loading: () => <CanvasPlaceholder /> }
)

export const ParticleWaveDynamic = dynamic(
    () => import('@/components/three/ParticleWave'),
    { ssr: false, loading: () => <CanvasPlaceholder /> }
)
