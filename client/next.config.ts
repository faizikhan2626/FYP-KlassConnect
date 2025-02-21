import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [], // Keep empty if using local images
    unoptimized: true, // ✅ Allow local images from /public folder
  },
};

export default nextConfig;
