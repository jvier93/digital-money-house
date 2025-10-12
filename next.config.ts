import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Solo usar standalone en Docker, Vercel lo detecta automáticamente
  output: process.env.DOCKER_BUILD === "true" ? "standalone" : undefined,
};

export default nextConfig;
