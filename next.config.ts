import type { NextConfig } from 'next';
import { services } from './src/lib/constants/services';
import { locations } from './src/lib/constants/locations';

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
  async redirects() {
    return [
      // Old blog URL pattern: /post/{slug} → /blog/{slug}
      {
        source: '/post/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // Old service×location pattern: /carpet-cleaning-basildon → /carpet-cleaning/basildon
      ...services.flatMap((service) =>
        locations.map((location) => ({
          source: `/${service.slug}-${location.slug}`,
          destination: `/${service.slug}/${location.slug}`,
          permanent: true,
        }))
      ),
    ];
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
