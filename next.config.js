/** @type {import('next').NextConfig} */
const withFonts = require('next-fonts');
const nextConfig = withFonts({
  enableSvg: true, // If you're using SVG fonts

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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      loader: 'node-loader',
    });

    return config;
  },
})

module.exports = nextConfig
