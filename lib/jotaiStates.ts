import { atom } from "jotai";
import { chainIndexInit } from "./initconditions";
//https://jotai.org/
//https://github.com/pmndrs/jotai
export const walletMenuOpenAtom = atom<boolean>(false);

export const chainIndexAtom = atom(chainIndexInit);

export const errAtom = atom("");
//const [count, setCount] = useAtom(counter);

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
