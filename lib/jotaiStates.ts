import { atom } from "jotai";
import { chainIndexInitial } from "./utils";
//https://jotai.org/
export const chainIndexAtom = atom(chainIndexInitial);

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
/*
import type { ChangeEvent } from "react";

export const TextInput = () => {
  const [chainIndex, setChainIndex] = useAtom(chainIndexAtom);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseIntSafe(e.target.value);
    if (newIndex < 0) {
      ll("index < 0");
    } else {
      setChainIndex(newIndex);
    }
  };
  return <input value={chainIndex} onChange={handleChange} />;
}; */
