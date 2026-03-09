/** @type {import('next').NextConfig} */
// MDX 改由 next-mdx-remote/rsc 在 Server Component 層處理
// 避免 @next/mdx webpack loader 在 Turbopack 下的 serialization 錯誤
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

export default nextConfig;