/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    config.module.rules.push({
      test: /.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
          },
        },
      ],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Link: https://fe-developers.kakaoent.com/2022/220714-next-image/
    imageSizes: [64, 256],
    deviceSizes: [512],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  output: "standalone",
};

module.exports = nextConfig;
