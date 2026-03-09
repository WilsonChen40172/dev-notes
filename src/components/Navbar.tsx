// src/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="border-b border-neutral-800 bg-black text-neutral-200 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-lg font-bold tracking-wider hover:text-white transition-colors">
                    Dev Notes
                </Link>
                <div className="flex gap-6 text-sm font-medium">
                    <Link href="/syntax" className="hover:text-white transition-colors">
                        基礎與語法
                    </Link>
                    <Link href="/leetcode" className="hover:text-white transition-colors">
                        LeetCode
                    </Link>
                    <Link href="/redux" className="hover:text-white transition-colors">
                        Redux
                    </Link>
                    <Link href="/threejs" className="hover:text-white transition-colors">
                        Three.js
                    </Link>
                </div>
            </div>
        </nav>
    );
}