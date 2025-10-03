/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        backend_url: process.env.BACKEND_URL || 'http://localhost:8080',
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
