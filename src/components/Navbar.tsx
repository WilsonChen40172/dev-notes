// src/components/Navbar.tsx
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    return (
        <nav className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm text-neutral-700 dark:text-neutral-200 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-lg font-bold tracking-wider hover:text-black dark:hover:text-white transition-colors">
                    Dev Notes
                </Link>
                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/syntax" className="hover:text-black dark:hover:text-white transition-colors">
                        基礎與語法
                    </Link>
                    <Link href="/leetcode" className="hover:text-black dark:hover:text-white transition-colors">
                        LeetCode
                    </Link>
                    <Link href="/redux" className="hover:text-black dark:hover:text-white transition-colors">
                        Redux
                    </Link>
                    <Link href="/threejs" className="hover:text-black dark:hover:text-white transition-colors">
                        Three.js
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}