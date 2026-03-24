import { atom } from "jotai";
//https://jotai.org/
export const chainIndexAtom = atom(0);

export const chainsAtom = atom([
  {
    blockchain: "sepolia",
    contractAddr: "0x123Abcdef456Abcdef",
    acceptedTokSymbol: "USDT",
  },
  {
    blockchain: "solanaDevnet",
    contractAddr: "123Abcdef456Abcdef",
    acceptedTokSymbol: "USDC",
  },
]);
