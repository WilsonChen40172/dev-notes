// src/app/(notes)/leetcode/[slug]/page.tsx
// 動態路由：統一處理所有 LeetCode 詳細筆記頁
// generateStaticParams  → build time 預先產生所有題目頁面（SSG）
// generateMetadata      → 從 MDX 第一行 # 標題自動抽取，動態產生 <title> 與 OG 標籤
import { readFile, readdir } from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import MdxPage from '@/components/MdxPage'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/leetcode')

// Build time：列出所有 MDX 檔案並產生對應的靜態路徑
export async function generateStaticParams() {
    const files = await readdir(CONTENT_DIR)
    return files
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => ({ slug: f.replace(/\.mdx$/, '') }))
}

// 從 MDX 第一行 `# 標題` 抽取標題文字
async function getTitleFromMdx(slug: string): Promise<string | null> {
    try {
        const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
        const source = await readFile(filePath, 'utf-8')
        const match = source.match(/^#\s+(.+)$/m)
        return match ? match[1].trim() : null
    } catch {
        return null
    }
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params
    const title = await getTitleFromMdx(slug)

    if (!title) return { title: 'LeetCode | Dev Notes' }

    return {
        title: `${title} | LeetCode`,
        description: `${title} 解題思路、複雜度分析與 TypeScript 實作`,
        openGraph: {
            title: `${title} | LeetCode | Dev Notes`,
            description: `${title} 解題思路、複雜度分析與 TypeScript 實作`,
        },
    }
}

export default async function LeetCodeDetailPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)

    try {
        await readFile(filePath, 'utf-8') // 確認檔案存在
    } catch {
        notFound()
    }

    return <MdxPage contentPath={`src/content/leetcode/${slug}.mdx`} />
}
