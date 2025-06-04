const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: {
      exclude: ["error", "warn"],
    },
    styledComponents: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.zyrosite.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
