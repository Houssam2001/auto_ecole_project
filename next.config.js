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
      {
        protocol: 'https',
        hostname: 'lavinephotography.com.au',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.australianageingagenda.com.au',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars2.githubusercontent.com',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.imagin.studio',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'bkvsahkfjyxfeibvwrpm.supabase.co',
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
