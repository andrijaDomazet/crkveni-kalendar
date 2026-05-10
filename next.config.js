/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  sassOptions: {
    includePaths: ["./src"],
  },
};

module.exports = nextConfig;
