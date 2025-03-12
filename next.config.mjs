/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any other configuration options here
  
  // Ignore TypeScript and ESLint errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig; 