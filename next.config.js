module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '144.217.79.28',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: "standalone",
};
