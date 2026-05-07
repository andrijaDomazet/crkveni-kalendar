/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  sassOptions: {
    includePaths: ["./src"],
  },
};

module.exports = nextConfig;
