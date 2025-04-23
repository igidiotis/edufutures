/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure images to allow SVG, JPEG, PNG, GIF
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Build the app from the app directory
  experimental: {
    // No experimental features needed at this time
  },
};

module.exports = nextConfig; 