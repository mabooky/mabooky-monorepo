import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export',
    reactCompiler: true,
    transpilePackages: [
        '@mabooky/md3'
    ]
};

export default nextConfig;
