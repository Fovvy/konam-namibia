/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // No experimental features enabled to ensure maximum compatibility
};

module.exports = nextConfig; 