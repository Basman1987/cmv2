/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'metadata.nftscan.com',
      'indigo-planned-cockroach-959.mypinata.cloud'
    ],
    unoptimized: true,
  },
  // Remove the problematic experimental options
  experimental: {
    // parallelServerBuildTraces: true, // Removed
    // parallelServerCompiles: true,    // Removed
  }
};

export default nextConfig;

