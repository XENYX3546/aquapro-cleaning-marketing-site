import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  transpilePackages: [],
  experimental: {
    optimizeCss: true,
    inlineCss: true,
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    qualities: [50, 65, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'litter.catbox.moe',
        pathname: '/**',
      },
      // Blog/CMS image sources
      {
        protocol: 'https',
        hostname: 'app.zuviaone.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.zuviaone.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.zuviaone.com',
        pathname: '/**',
      },
      // Common CDN providers for blog images
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net',
        pathname: '/**',
      },
      // Tigris/Fly.io storage (used by Zuvia)
      {
        protocol: 'https',
        hostname: '**.fly.storage.tigris.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
