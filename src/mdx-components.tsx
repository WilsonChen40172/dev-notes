// src/mdx-components.tsx
import type { MDXComponents } from 'mdx/types'
import type { ReactElement } from 'react'
import { codeToHtml } from 'shiki'

// Server Component：用 Shiki 做語法高亮，取代 rehype-pretty-code
// 可在 Turbopack / Webpack 環境下正常運作
async function Pre({ children }: { children?: React.ReactNode }) {
    const codeEl = children as ReactElement<{ className?: string; children: string }>
    const lang = codeEl?.props?.className?.replace('language-', '') || 'plaintext'
    const code = String(codeEl?.props?.children ?? '').trim()

    let html: string
    try {
        html = await codeToHtml(code, { lang, theme: 'one-dark-pro' })
    } catch {
        html = `<pre class="shiki"><code>${code}</code></pre>`
    }

    return (
        <div
            dangerouslySetInnerHTML={{ __html: html }}
            className="my-4 rounded-lg overflow-hidden text-sm [&>pre]:p-5 [&>pre]:overflow-x-auto [&>pre]:leading-relaxed"
        />
    )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 border-b pb-2">{children}</h2>,
        p: ({ children }) => <p className="leading-relaxed mb-4 text-gray-300">{children}</p>,
        a: ({ href, children }) => <a href={href} className="text-blue-400 hover:underline">{children}</a>,
        pre: Pre as MDXComponents['pre'],
        code: ({ children, className }) => {
            // inline code（無語言 class）→ 套用樣式
            // block code（有語言 class）→ 交由 pre 處理，直接回傳純內容
            if (!className) {
                return (
                    <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono text-neutral-200">
                        {children}
                    </code>
                )
            }
            return <code className={className}>{children}</code>
        },
        ...components,
    }
}

export default useMDXComponents