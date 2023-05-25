/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://web.archive.org/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
