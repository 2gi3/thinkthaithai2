/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // api: {
  //   bodyParser: {
  //     sizeLimit: '10mb',
  //   }
  // },

  i18n,
};

module.exports = nextConfig;
