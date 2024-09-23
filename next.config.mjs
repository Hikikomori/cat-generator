/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cataas.com',
      }
    ]
  },
  logging: {
    fetches: {
      hmrRefreshes: true,
      fullUrl: true
    }
  }
};

export default nextConfig;
