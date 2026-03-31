import { ethers } from "ethers";

import { ll } from "@/lib/utils";
import { chainInit } from "./initconditions";

//-------------==
let provider: any;
let _signer: any;
const _isInitialized = false;
const _mesg = "",
  _warning = "";
declare global {
  interface Window {
    ethereum: any;
  }
}

//[NOTICE] DO NOT use vendor api keys in RPC endpoints in frontend because it exposes your API keys. Use Ether.js default PRC
export type ProviderSigner = {
  error: string;
};
export const evmGuestRpcProvider = async () => {
  const funcName = "evmDefaultProvider";

  ll(`${funcName} will try to connect RPC at ${chainInit?.publicRpc}`);
  try {
    provider = ethers.getDefaultProvider(chainInit?.publicRpc); // a default provider is returned and that is backed by well-known public Web3 backends (such as infura)
    await getBlockNumber();
    return { err: "" };
  } catch (err: any) {
    console.error(`${funcName}:`, err);
    return { err: err.message };
  }
};
export const getBlockNumber = async () => {
  const blocknum = await provider.getBlockNumber();
  ll("blockNumber:", blocknum);
};

export const evmSetupSigner = async () => {
  const funcName = "evmSetupProvider";
  ll(`${funcName}()...`);
  try {
    provider = new ethers.BrowserProvider(window.ethereum);
    _signer = await provider.getSigner();
  } catch (err) {
    console.error(`${funcName} err:`, err);
    return { err };
  }
  return { err: "", what: "" };
};

export const getChainInfo = (input: string) => {
  //console.log('getChainInfo()... input:', input);
  let chainHex = "",
    chainName = "",
    chainId = "";
  switch (input) {
    case "ethereum":
    case "0x1":
      chainHex = "0x1";
      chainName = "mainnet";
      chainId = "1";
      break;
    case "sepolia":
    case "0xaa36a7":
      chainHex = "0xaa36a7";
      chainName = "sepolia";
      chainId = "11155111";
      break;
    case "polygon":
    case "0x89":
      chainHex = "0x89";
      chainName = "polygon";
      chainId = "137";
      break;
    case "mumbai":
    case "0x13881":
      chainHex = "0x13881";
      chainName = "mumbai";
      chainId = "80001";
      break;
    case "bsc":
    case "0x38":
      chainHex = "0x38";
      chainName = "bsc";
      chainId = "";
      break;
    case "bsc_testnet":
    case "0x61":
      chainHex = "0x61";
      chainName = "bsc_testnet";
      chainId = "97";
      break;
    case "avalanche":
    case "0xa86a":
      chainHex = "0xa86a";
      chainName = "avalanche";
      chainId = "";
      break;
    case "arbitrum":
    case "0xa4b1":
      chainHex = "0xa4b1";
      chainName = "arbitrum";
      chainId = "";
      break;
    case "base-sepolia":
      //case "0xa4b1":
      chainHex = "";
      chainName = "base-sepolia";
      chainId = "84532";
      break;
    case "anvil":
    case "foundry":
    case "0x7a69":
      chainHex = "";
      chainName = "foundry";
      chainId = "31337";
      break;
    case "hardhat":
    case "0x539":
      chainHex = "";
      chainName = "hardhat";
      chainId = "hardhat";
      break;
    default:
      chainHex = "invalid";
      chainName = "invalid";
      chainId = "invalid";
  }
  return { chainHex, chainName, chainId };
};
