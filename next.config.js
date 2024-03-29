/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "zh", "ja", "it"],
    defaultLocale: 'en',
  },
  images: {
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com'],
  },
};

module.exports = nextConfig;
