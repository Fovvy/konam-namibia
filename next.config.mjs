/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any other configuration options here
  
  // Disable TypeScript and ESLint errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable webpack5 for compatibility
  experimental: {
    swcMinify: true,
  },
  // Disable strict mode for compatibility
  reactStrictMode: false,
  // Optimize for production
  productionBrowserSourceMaps: false,
};

export default nextConfig; 