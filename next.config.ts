import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  serverExternalPackages: [
    "pino",
    "pino-pretty",
    "thread-stream",
    "@walletconnect/universal-provider",
    "@walletconnect/ethereum-provider",
    "mongoose",
  ],
};
//"@rainbow-me/rainbowkit", "viem", "wagmi",
export default nextConfig;
