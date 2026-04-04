//import { rainbowConnector } from "@rainbow-me/rainbow-button";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { createConfig, http } from "wagmi";
import { base, foundry, mainnet, sepolia } from "wagmi/chains";
import {
  coinbaseWallet,
  // injected,  type MetaMaskParameters,
  metaMask,
  safe,
  walletConnect,
} from "wagmi/connectors";
import { reownProjId } from "./initconditions";

//https://github.com/wevm/wagmi/blob/main/site/react/getting-started.md
//https://wagmi.sh/vue/guides/connect-wallet

//console.log("Reown Project Id:", reownProjId);
export const walletConnectConn = walletConnect({ projectId: reownProjId });
export const metamaskConn = metaMask();

/*declare module "wagmi" {
  interface Register {
    config: typeof configFoundry;
  }
}*/
//baseWallet, phantomWallet, injected(),
//useReadContract() will use the left most chain in chains below!
export const wagmiConfigEthereumSepolia = createConfig({
  chains: [sepolia, mainnet], //mainnet base,
  connectors: [metamaskConn, walletConnectConn, coinbaseWallet(), safe()], //connectors order matters
  transports: {
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY}`,
    ),
    [mainnet.id]: http(), //`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}` not working!
    //[base.id]: http(),
  },
  // storage: createStorage({
  //   storage: cookieStorage,
  // }),
  ssr: true,
  syncConnectedChain: true,
});
export const wagmiConfigFoundry = createConfig({
  chains: [foundry, sepolia], //mainnet base,
  connectors: [metamaskConn, walletConnectConn, coinbaseWallet(), safe()], //connectors order matters
  transports: {
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY}`,
    ),
    [foundry.id]: http(`http://127.0.0.1:8545`),
    //[mainnet.id]: http(), //`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}` not working!
    //[base.id]: http(),
  },
  // storage: createStorage({
  //   storage: cookieStorage,
  // }),
  ssr: true,
  syncConnectedChain: true,
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
