/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "localhost",
      "127.0.0.1",
      "unavatar.io",
      "flagsapi.com",
      "edelweiss-webapp.vercel.app",
      "source.unsplash.com"
    ],
  }
}

module.exports = nextConfig
