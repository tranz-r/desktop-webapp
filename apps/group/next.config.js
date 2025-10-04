/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        backend_url: process.env.BACKEND_URL || 'http://localhost:8080',
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
    },

    // Redirect to HTTPS/HTTP based on environment
    redirects() {
        return [];
    },

    // Custom webpack config
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Custom webpack configurations can be added here
        return config;
    },
};

module.exports = nextConfig;
