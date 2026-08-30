/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['better-sqlite3', 'bcryptjs'],
  images: {
    unoptimized: true,
  },
}

export default nextConfig
