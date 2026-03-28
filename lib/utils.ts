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
export const formatNumbers = (num: number) => {
  if (num >= 1000000000) {
    const billions = parseFloat((num / 1000000000).toFixed(2));
    return `${billions}B`;
  } else if (num >= 1000000) {
    const millions = parseFloat((num / 1000000).toFixed(2));
    return `${millions}M`;
  } else if (num >= 1000) {
    const thousands = parseFloat((num / 1000).toFixed(2));
    return `${thousands}K`;
  } else {
    return num.toString();
  }
};
export const formatBN = (input: string | undefined, dec = 18) => {
  if (!input) return "";
  const pow = 10 ** dec;
  return convertDecimal(BigInt(input) / BigInt(pow), 3);
};
export const convertDecimal = (num: bigint | number, dec = 2) => {
  const pow = 10 ** dec;
  return Number(Math.floor(Number(num) * pow) / pow).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: dec,
  });
};
export const convertBN = (input: string | undefined, dec = 18) => {
  if (!input) return "";
  const pow = 10 ** dec;
  return (BigInt(input) * BigInt(pow)).toString(10);
};
