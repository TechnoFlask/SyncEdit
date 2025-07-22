import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://lh3.googleusercontent.com/**")],
  },
  experimental: {
    ppr: true,
    useCache: true,
  },
  env: {
    KINDE_SITE_URL: `https://${process.env.VERCEL_URL}`,
    KINDE_POST_LOGIN_REDIRECT_URL: `https://${process.env.VERCEL_URL}`,
    KINDE_POST_LOGOUT_REDIRECT_URL: `https://${process.env.VERCEL_URL}`,
  },
};

export default nextConfig;
