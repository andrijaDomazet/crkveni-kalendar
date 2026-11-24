const nextConfig = {
  output: "export",
  trailingSlash: true,
  sassOptions: {
    includePaths: ["./src"],
  },
  experimental: {
    globalNotFound: true,
  },
};

module.exports = nextConfig;
