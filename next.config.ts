import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.youtube.com"], // 기존 유지
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://localhost:8080/:path*`, // 원래 누락된 :path* 추가!
      },
    ];
  },
  trailingSlash: true,
};

export default nextConfig;
