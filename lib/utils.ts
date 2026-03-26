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
