/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@xw3/maki',
    '@xw3/maki-chakra',
    '@xw3/maki-quest'
  ],
  reactStrictMode: true,
};

module.exports = nextConfig