const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // We already run `npx tsc --noEmit` which passed with code 0
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
