/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "*"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://web.archive.org/:path*`,
      },
      {
        source: "/api-og/:path*",
        destination: `https://:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
