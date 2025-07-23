import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  turbopack: {
    resolveAlias: {
      canvas: './empty.ts',
    },
  },
};

export default nextConfig;
