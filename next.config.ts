import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  // No experimental features enabled to ensure maximum compatibility
};

export default nextConfig;
