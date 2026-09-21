import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

const nextConfig: NextConfig = {
    /* config options here */
    output: 'export',
    reactCompiler: true,
    transpilePackages: ['@mabooky/md3',],
    allowedDevOrigins: ['172.30.1.*', '192.168.113.*'],
};

const withMDX = createMDX({
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: 'github-dark' }]],
    }
})

export default withMDX(nextConfig);
