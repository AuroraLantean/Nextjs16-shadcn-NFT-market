import {
  cookieStorage,
  createConfig,
  createStorage,
  http,
  useBlockNumber,
} from "wagmi";
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

const reownProjId = process.env["NEXT_PUBLIC_REOWN_PROJECTID"];
console.log("Reown Project Id:", reownProjId);

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, base],
  connectors: [injected(), walletConnect({ reownProjId }), metaMask(), safe()],
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

const connector = metaMask({
  dapp: {
    name: "Dapp + Wagmi",
    url: "https://example.com",
    iconUrl: "https://example.com/favicon.ico",
  },
});
