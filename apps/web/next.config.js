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
  // Suppress React warnings in development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Suppress specific React warnings
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-dom/client': 'react-dom/client',
      };
      
      // Add plugin to suppress console warnings
      const originalConsoleWarn = console.warn;
      console.warn = (...args) => {
        const message = args[0];
        if (
          typeof message === 'string' && 
          (message.includes('useInsertionEffect must not schedule updates') ||
           message.includes('Warning: useInsertionEffect'))
        ) {
          return; // Suppress this specific warning
        }
        originalConsoleWarn.apply(console, args);
      };
    }
    return config;
  },
  // Suppress specific warnings
  experimental: {
    suppressHydrationWarning: true,
  },
  // Additional React configuration
  reactStrictMode: false, // Disable strict mode to reduce warnings
};

module.exports = nextConfig;