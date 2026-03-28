import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//------------== Initial Conditions
export const chainIndexInitial = 0;
export const APP_WIDTH_MIN = 350;
export const chainTypeDefault = "evm";
export const localChainDefault = "Foundry".toLowerCase();
export const nftIdMin = 0;
export const nftIdMax = 9;
export const ll = console.log;

export const metamaskSrc = "/wallets/metamask.png";
export const walletconnectSrc = "/wallets/walletconnect.png";
export const coinbaseSrc = "/wallets/coinbase.png";
export const phantomSrc = "/wallets/phantom.png";
export const safewalletSrc = "/wallets/safewallet.png";
export const trustwalletSrc = "/wallets/trustwallet.png";

//------------== ENV
export const reownProjId =
  process.env["NEXT_PUBLIC_REOWN_PROJECTID"] ?? "REOWN_PROJECT_ID_INVALID";
export const phantomAppId =
  process.env["NEXT_PUBLIC_PHANTOM_APP_ID"] ?? "PHANTOM_APP_ID_INVALID";
export const alchemyApikey =
  process.env["NEXT_PUBLIC_ALCHEMY_APIKEY"] ?? "ALCHEMY_APIKEY_INVALID";

export const ethereumNetwork =
  process.env["NEXT_PUBLIC_ETHEREUM_NETWORK"] ?? "ETHEREUM_NETWORK_INVALID";
export const solanaNetwork =
  process.env["NEXT_PUBLIC_SOLANA_NETWORK"] ?? "SOLANA_NETWORK_INVALID";

export const alchemyRPC = (blockchain: string) => {
  let part1 = "";
  switch (blockchain) {
    //case "bitcoin": { } break;
    case "ethereum":
      {
        part1 = "eth-mainnet";
        if (ethereumNetwork === "sepolia") {
          part1 = "eth-sepolia";
        } else {
          console.error("ethereum network invalid");
        }
      }
      return `https://${part1}.g.alchemy.com/v2/${alchemyApikey}`;
    case "solana":
      {
        part1 = "solana-mainnet";
        if (solanaNetwork === "sepolia") {
          part1 = "solana-devnet";
        } else {
          console.error("solana network invalid");
        }
      }
      return `https://${part1}.g.alchemy.com/v2/${alchemyApikey}`;
    default:
      {
        console.error("blockchain invalid");
      }
      break;
  }
};
//------------== Functions
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseFloatSafe = (input: string) => {
  const out = Number.parseFloat(input);
  if (Number.isNaN(out)) {
    ll("parseFloatSafe failed");
    return -1.1;
  }
  return out;
};
export const parseIntSafe = (input: string) => {
  const out = Number.parseInt(input, 10);
  if (Number.isNaN(out)) {
    ll("parseIntSafe failed");
    return -1;
  }
  return out;
};
