import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/works/galerie-de-bal' : '';

const nextConfig: NextConfig = {
    /* config options here */
    output: 'export',
    basePath,
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
    reactCompiler: true,
    transpilePackages: ["@mabooky/md3"],
    allowedDevOrigins: ['172.30.1.*', '192.168.113.*']
};

export default nextConfig;
