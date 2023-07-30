/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // output: "standalone",
  staticPageGenerationTimeout: 100,
};

module.exports = nextConfig;
