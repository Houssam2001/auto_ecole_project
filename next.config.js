/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.icon-library.com',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'vojislavd.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
    webpack: (config, { isServer }) => {
        // Custom webpack configuration here
        return config;
      },
}

module.exports = nextConfig
