// src/components/MdxPage.tsx
// 通用 MDX 頁面渲染器：讀取 content 目錄下的 .mdx 檔案並渲染
// 使用 next-mdx-remote/rsc，在 Server Component 層處理 MDX（不需要 webpack/Turbopack loader）
import { readFile } from 'fs/promises'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import mdxComponents from '@/mdx-components'

interface MdxPageProps {
    /** 相對於專案根目錄的 MDX 檔案路徑，例如 'src/content/leetcode/two-sum.mdx' */
    contentPath: string
}

export default async function MdxPage({ contentPath }: MdxPageProps) {
    const fullPath = path.join(process.cwd(), contentPath)
    const source = await readFile(fullPath, 'utf-8')

    return (
        <article className="max-w-none">
            <MDXRemote source={source} components={mdxComponents} />
        </article>
    )
}
