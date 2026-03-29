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

//import { localChainDefault } from "@/constants/site_data";
import { arrayRange, capitalizeFirst, isEmpty, isEqualStr } from "@/lib/utils";
import { ll } from "./utils";

const erc20_usdtAddr =
  process.env["NEXT_PUBLIC_EVM_USDT"] ?? erc20JSON?.contractAddress;
const erc20_usdcAddr = process.env["NEXT_PUBLIC_EVM_USDC"] ?? "";

const erc721Addr =
  process.env["NEXT_PUBLIC_EVM_NFT"] ?? erc721JSON?.contractAddress;
const salesAddr =
  process.env["NEXT_PUBLIC_EVM_NFTSALES"] ?? salesJSON?.contractAddress;

export const ethAddr1 = process.env["NEXT_PUBLIC_EVM_ADDR1"] ?? "";
export const ethAddr2 = process.env["NEXT_PUBLIC_EVM_ADDR2"] ?? "";

let provider: any;
let signer: any;
const isInitialized = false;
const mesg = "",
  warning = "";
declare global {
  interface Window {
    ethereum: any;
  }
}
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
