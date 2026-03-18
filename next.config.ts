import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  serverExternalPackages: [
    "pino",
    "@rainbow-me/rainbowkit",
    "viem",
    "wagmi",
    "pino-pretty",
    "thread-stream",
    "@walletconnect/universal-provider",
    "@walletconnect/ethereum-provider",
    "mongoose",
  ],
};

export default nextConfig;
