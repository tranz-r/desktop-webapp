/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Completely disable static generation
  staticPageGenerationTimeout: 0,
  trailingSlash: false,
  // Force all pages to be dynamic
  async redirects() {
    return []
  },
  async rewrites() {
    return []
  },
};

module.exports = nextConfig;
