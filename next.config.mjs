/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow video/image assets from the public directory without issues
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
