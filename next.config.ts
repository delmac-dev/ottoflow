import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  webpack: (config) => {
    config.resolve.alias["canvas"] = path.resolve("./empty.ts");
    return config;
  },
  turbopack: {
    resolveAlias: {
      canvas: './empty.ts',
    },
  },
};

export default nextConfig;
