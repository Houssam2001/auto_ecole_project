/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Custom webpack configuration here
        return config;
      },
}

module.exports = nextConfig
