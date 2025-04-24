/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  eslint: {
    // Allow production builds to successfully complete even if
    // ESLint errors are present (useful during dev)
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 