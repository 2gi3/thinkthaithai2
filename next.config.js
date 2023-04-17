/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "zh", "ja", "it"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
