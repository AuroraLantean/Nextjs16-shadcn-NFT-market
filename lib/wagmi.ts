import { rainbowConnector } from "@rainbow-me/rainbow-button";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { trustWallet } from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { base, mainnet, sepolia } from "wagmi/chains";
import {
  coinbaseWallet,
  // injected,  type MetaMaskParameters,
  metaMask,
  safe,
  walletConnect,
} from "wagmi/connectors";

//https://github.com/wevm/wagmi/blob/main/site/react/getting-started.md
//https://wagmi.sh/vue/guides/connect-wallet

const reownProjId =
  process.env["NEXT_PUBLIC_REOWN_PROJECTID"] ?? "YOUR_PROJECT_ID";
console.log("Reown Project Id:", reownProjId);

//baseWallet, phantomWallet, injected(),
export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, base],
  connectors: [
    walletConnect({ reownProjId }),
    metaMask(),
    coinbaseWallet(),
    safe(),
  ],
  transports: {
    // RPC URL for each chain
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    //[mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`, ),
  },
  // storage: createStorage({
  //   storage: cookieStorage,
  // }),
  ssr: true,
});
export const rainbowkitConfig = getDefaultConfig({
  appName: "NextJs Dapp",
  projectId: reownProjId,
  chains: [mainnet, sepolia, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
  // connectors: [
  //   rainbowConnector({ projectId: reownProjId, appName: "Your App" }),
  // ],
});

const connector = metaMask({
  dapp: {
    name: "Dapp + Wagmi",
    url: "https://example.com",
    iconUrl: "https://example.com/favicon.ico",
  },
});
