/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Disable image optimization and allow any external domains
    unoptimized: true,
  },
  // Add proper routing configuration
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  // Ensure pages are properly built
  output: 'standalone',
  // Enable proper routing in production
  experimental: {
    appDir: true,
  }
};

export default nextConfig;
