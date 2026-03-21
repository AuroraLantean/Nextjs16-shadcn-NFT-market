import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const APP_WIDTH_MIN = 350;
export const chainTypeDefault = "evm";
export const localChainDefault = "Foundry".toLowerCase();
export const nftIdMin = 0;
export const nftIdMax = 9;
export const ll = console.log;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseFloatSafe = (input: string) => {
  const out = Number.parseFloat(input);
  if (Number.isNaN(out)) {
    console.error("parseFloatSafe failed");
    return -1.1;
  }
  return out;
};
export const parseIntSafe = (input: string) => {
  const out = Number.parseInt(input, 10);
  if (Number.isNaN(out)) {
    console.error("parseIntSafe failed");
    return -1;
  }
  return out;
};
