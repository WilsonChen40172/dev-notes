// src/mdx-components.tsx
// 供 next-mdx-remote/rsc 的 MDXRemote components 使用（非 @next/mdx）
import type { MDXComponents } from 'mdx/types'
import type { ReactElement } from 'react'
import { codeToHtml } from 'shiki'

// Async Server Component：使用 Shiki 做語法高亮
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

const mdxComponents: MDXComponents = {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">{children}</h2>,
    p: ({ children }) => <p className="leading-relaxed mb-4 text-neutral-700 dark:text-gray-300">{children}</p>,
    a: ({ href, children }) => <a href={href} className="text-blue-400 hover:underline">{children}</a>,
    pre: Pre as MDXComponents['pre'],
    code: ({ children, className }) => {
        if (!className) {
            return (
                <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono text-neutral-700 dark:text-neutral-200">
                    {children}
                </code>
            )
        }
        return <code className={className}>{children}</code>
    },
}

export default mdxComponents