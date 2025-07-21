import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://lh3.googleusercontent.com/**")],
  },
  experimental: {
    ppr: true,
    useCache: true,
  },
};

export default nextConfig;
