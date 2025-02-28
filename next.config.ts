import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // No experimental features enabled to ensure maximum compatibility
};

export default nextConfig;
