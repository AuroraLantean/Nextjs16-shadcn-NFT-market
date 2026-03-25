import { createConfig, http, useBlockNumber } from "wagmi";
import { base, mainnet, sepolia } from "wagmi/chains";
import {
  injected,
  type MetaMaskParameters,
  metaMask,
  safe,
  walletConnect,
} from "wagmi/connectors";

//https://github.com/wevm/wagmi/blob/main/site/react/getting-started.md
//https://wagmi.sh/vue/guides/connect-wallet

const projectId = process.env["NEXT_PUBLIC_REOWN_PROJECTID"];
console.log("Reown Project Id:", projectId);

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, base],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
  },
});

const connector = metaMask({
  dapp: {
    name: "Dapp + Wagmi",
    url: "https://example.com",
    iconUrl: "https://example.com/favicon.ico",
  },
});
