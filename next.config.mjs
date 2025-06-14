/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow image optimization and external domains
    domains: [
      'a.impactradius-go.com',
      'imp.pxf.io'
    ],
    unoptimized: true
  },
  // Add proper routing configuration
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  // Ensure pages are properly built
  output: 'standalone',
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    // Disable type checking during build
    ignoreBuildErrors: true
  },
  // Disable powered by header
  poweredByHeader: false,
  // Ensure static optimization
  reactStrictMode: true,
  swcMinify: true,
  // Configure headers for public access
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
