import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    transpilePackages: ["@mabooky/md3"],
    allowedDevOrigins: ['172.30.1.*', '192.168.113.*']
};

export default nextConfig;
