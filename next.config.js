/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
};

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  nextConfig,
  assetPrefix: isProd ? "https://tw-yk.com" : undefined,
};
