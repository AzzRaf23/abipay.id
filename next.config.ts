import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        // Semua request ke /api/... di localhost akan diteruskan langsung ke Vercel di belakang layar
        source: "/api/:path*",
        destination: "https://abipay-id-4ic7-bsrdddrhk-lionheart1.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;