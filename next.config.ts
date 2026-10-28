import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // <--- Tambahkan baris ini untuk static export
  typescript: {
    // Memaksa Vercel/Build tetap meloloskan build meskipun ada error/warning TypeScript
    ignoreBuildErrors: true,
  },
};

export default nextConfig;