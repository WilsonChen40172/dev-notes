// src/mdx-components.tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 border-b pb-2">{children}</h2>,
        p: ({ children }) => <p className="leading-relaxed mb-4 text-gray-300">{children}</p>,
        a: ({ href, children }) => <a href={href} className="text-blue-400 hover:underline">{children}</a>,
        ...components,
    }
}

export default useMDXComponents;