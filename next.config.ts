import createMDX from '@next/mdx';

// rehype-pretty-code 改為在 mdx-components.tsx 透過 Shiki Server Component 處理
// 原因：Turbopack 要求 loader options 必須可序列化，函數型插件不支援
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

export default withMDX(nextConfig);