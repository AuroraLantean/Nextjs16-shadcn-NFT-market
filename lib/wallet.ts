import {
  Contract,
  ethers,
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
  toNumber,
} from "ethers";
import contractsJSON from "@/web3ABIs/ethereum/contractABIsERC721Sales.json";
export const evmCtrtLen = contractsJSON.length;
const erc20JSON = contractsJSON[0];
const erc721JSON = contractsJSON[1];
const salesJSON = contractsJSON[2];

import { ll } from "./utils";

let provider: any;
let signer: any;
/*
export const evmInitWalletAfterLoad = async () =>
  window.addEventListener("load", async () => {
    let _initOut = web3InitDefault;
    try {
      _initOut = await evmInitializeWallet();
    } catch (err: any) {
      console.error("@evmInitializeWallet:", err);
      return { ...web3InitDefault, err: err.message };
    }
  });
export const evmInitializeWallet = async () => {};

export const evmSetupSigner = async () => {
  const funcName = "evmSetupProvider";
  ll(`${funcName}()...`);
  try {
    provider = new ethers.BrowserProvider(window.ethereum); //in case provider is not properly setup
    signer = await provider.getSigner();
  } catch (err) {
    console.error(`${funcName} err:`, err);
  }
  ll(`${funcName} ran successfully`);
  return {
    ...web3InitDefault,
  };
};
*/
