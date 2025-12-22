import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  productionBrowserSourceMaps: false,
  images: {
    domains: ['fakestoreapi.com'],
  },
};

export default nextConfig;
