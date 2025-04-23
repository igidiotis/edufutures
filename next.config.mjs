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
    unoptimized: true, // Disable image optimization to avoid metadata issues
  },
  // Simplify configuration
  experimental: {
    // Disable metadata generation for now
    typedRoutes: false,
  },
};

export default nextConfig; 