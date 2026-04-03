import aDeployedCtrts from "@/ethereumABIs/aDeployedCtrts.json";
import { parseIntSafe } from "./utils";

export const initBlockchainIndexStr =
  process.env.NEXT_PUBLIC_INIT_BLOCKCHAIN_INDEX ??
  "INIT_BLOCKCHAIN_INDEX_INVALID";
export const reownProjId =
  process.env.NEXT_PUBLIC_REOWN_PROJECTID ?? "REOWN_PROJECT_ID_INVALID";
export const phantomAppId =
  process.env.NEXT_PUBLIC_PHANTOM_APP_ID ?? "PHANTOM_APP_ID_INVALID";

const ethAddr1 = process.env.NEXT_PUBLIC_EVM_ADDR1 ?? "";
const ethAddr2 = process.env.NEXT_PUBLIC_EVM_ADDR2 ?? "";
export const evmAddrs = { addr1: ethAddr1, addr2: ethAddr2 };

export const APP_WIDTH_MIN = 350;
export const nftIdMin = 0;
export const nftIdMax = 9;

export const metamaskSrc = "/wallets/metamask.png";
export const walletconnectSrc = "/wallets/walletconnect.png";
export const coinbaseSrc = "/wallets/coinbase.png";
export const phantomSrc = "/wallets/phantom.png";
export const safewalletSrc = "/wallets/safewallet.png";
export const trustwalletSrc = "/wallets/trustwallet.png";

export const userInit = {
  err: "",
  warn: "",
  account: "",
};
export type UserInitT = typeof userInit;

//ethereum-sepolia
//base-sepolia, arbitrum-sepolia, solana-devnet
export type Chain = {
  chainType: string; //evm or solana
  chainId: string;
  chainMainnet: string;
  chainTarget: string;
  publicRpc: string;
  explorer: string;
  usdtAddr: string;
  usdcAddr: string;
  nftAddr: string;
  targetCtrt1: string;
  targetCtrt2: string;
  acceptedTokSymbol: string;
  nftOriginalOwner: string;
};
export const chainEthereumSepolia = {
  chainType: "evm",
  chainId: "11155111",
  chainMainnet: "ethereum", //or arbitrum, base
  chainTarget: "sepolia", //or sepolia, sepolia
  publicRpc: "https://ethereum-sepolia-rpc.publicnode.com",
  explorer: "https://sepolia.etherscan.io",
  usdtAddr: "0xbdEd0D2bf404bdcBa897a74E6657f1f12e5C6fb6",
  usdcAddr: "",
  nftAddr: "0xA7918D253764E42d60C3ce2010a34d5a1e7C1398",
  targetCtrt1: "0x71a9d115E322467147391c4a71D85F8e1cA623EF",
  targetCtrt2: "0xB35D3C9b9f2Fd72FAAb282E8Dd56da31FAA30E3d",
  nftOriginalOwner: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  acceptedTokSymbol: "USDT",
};

export const chains: Chain[] = [
  {
    chainType: "evm",
    chainId: "31337",
    chainMainnet: "ethereum", //or arbitrum, base
    chainTarget: "foundry", //or sepolia, sepolia
    publicRpc: "http://127.0.0.1:8545",
    explorer: "",
    usdtAddr: aDeployedCtrts.USDT_ADDR,
    usdcAddr: "",
    nftAddr: aDeployedCtrts.DRAGONS_ADDR,
    targetCtrt1: aDeployedCtrts.SALES_ADDR,
    targetCtrt2: "",
    nftOriginalOwner: aDeployedCtrts.Deployer,
    acceptedTokSymbol: "USDT",
  },
  chainEthereumSepolia,
  {
    //https://chainlist.org/chain/1?testnets=true
    chainType: "evm",
    chainId: "1",
    chainMainnet: "ethereum", //or arbitrum, base
    chainTarget: "mainnet", //or sepolia, sepolia
    publicRpc: "https://eth.drpc.org",
    explorer: "https://etherscan.io",
    usdtAddr: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    usdcAddr: "",
    nftAddr: "",
    targetCtrt1: "",
    targetCtrt2: "",
    nftOriginalOwner: "",
    acceptedTokSymbol: "USDT",
  },
  {
    //https://docs.arbitrum.io/build-decentralized-apps/reference/node-providers
    chainType: "evm",
    chainId: "421614",
    chainMainnet: "arbitrum", //or arbitrum, base
    chainTarget: "sepolia", //or sepolia, sepolia
    publicRpc: "https://sepolia-rollup.arbitrum.io/rpc",
    explorer: "",
    usdtAddr: "",
    usdcAddr: "",
    nftAddr: "",
    targetCtrt1: "",
    targetCtrt2: "",
    nftOriginalOwner: "",
    acceptedTokSymbol: "USDT",
  },
  {
    //https://solana.com/docs/references/clusters
    chainType: "solana",
    chainId: "102",
    chainMainnet: "solana",
    chainTarget: "devnet", //or mainnet-beta
    publicRpc: "https://api.devnet.solana.com",
    explorer: "http://explorer.solana.com/",
    usdtAddr: "",
    usdcAddr: "",
    nftAddr: "",
    targetCtrt1: "",
    targetCtrt2: "",
    nftOriginalOwner: "",
    acceptedTokSymbol: "USDC",
  },
  {
    //https://solana.com/docs/references/clusters
    chainType: "solana",
    chainId: "900",
    chainMainnet: "solana",
    chainTarget: "mainnet-beta",
    publicRpc: "https://api.mainnet.solana.com",
    explorer: "http://explorer.solana.com/",
    usdtAddr: "",
    usdcAddr: "",
    nftAddr: "",
    targetCtrt1: "",
    targetCtrt2: "",
    nftOriginalOwner: "",
    acceptedTokSymbol: "USDC",
  },
];
export const chainIndexInit = parseIntSafe(initBlockchainIndexStr);
export const chainInit1 = chains[chainIndexInit];

export const chainInit = chainInit1 ?? chainEthereumSepolia;
