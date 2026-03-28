//import { rainbowConnector } from "@rainbow-me/rainbow-button";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { createConfig, http } from "wagmi";
import { base, mainnet, sepolia } from "wagmi/chains";
import {
  coinbaseWallet,
  // injected,  type MetaMaskParameters,
  metaMask,
  safe,
  walletConnect,
} from "wagmi/connectors";
import { reownProjId } from "./utils";

//https://github.com/wevm/wagmi/blob/main/site/react/getting-started.md
//https://wagmi.sh/vue/guides/connect-wallet

console.log("Reown Project Id:", reownProjId);
export const walletConnectConn = walletConnect({ projectId: reownProjId });
export const metamaskConn = metaMask();

//baseWallet, phantomWallet, injected(),
export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, base],
  connectors: [metamaskConn, walletConnectConn, coinbaseWallet(), safe()], //connectors order matters
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

/* For ConnectKit from https://family.co/docs/connectkit/getting-started

import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
    },
    enableFamily: false,

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);
export const ConnectKitProvider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="midnight">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
*/
