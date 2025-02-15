/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ]
  },
  // Disable SWC minification to prevent build issues in WebContainer
  swcMinify: false,
  // Use wasm compiler for WebContainer compatibility
  experimental: {
    forceSwcTransforms: true
  }
};

module.exports = nextConfig;