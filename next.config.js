/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
    webpack: (config, { isServer }) => {
        // Custom webpack configuration here
        return config;
      },
}

module.exports = nextConfig
