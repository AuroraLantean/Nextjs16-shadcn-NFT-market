import { switchChain } from "@wagmi/core";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { foundry, sepolia } from "viem/chains";
import { useBalance, useChainId, useConnection, useReadContract } from "wagmi";
import USDX from "@/ethereumABIs/USDX.json";
import { findConfigChain, usdtEthereumMain } from "@/lib/initconditions";
import {
  ll,
  makeShortAddr,
  nativeBalcToFloatUi,
  tokBalcToFloatUi,
} from "@/lib/utils";
import { providerConfig } from "@/lib/wagmi";
import { Button } from "./ui/button";

//connectkit at video 2743
//https://wagmi.sh/react/api/hooks/useReadContract
const ReadErc20 = () => {
  const chainId = useChainId();
  //const chains = useChains();
  const {
    address,
    addresses,
    chain,
    chainId: chainIdViaConnection,
    isConnected,
  } = useConnection(); //its chainId is incorrect
  /*ll(
    `ReadErc20: ${address}, chainName: ${chain?.name}, chainIdViaConnection: ${chainIdViaConnection},isConnected: ${isConnected}, addressesLen: ${addresses?.length}; chainId: ${chainId}}`,
  );*/
  //ll("addresses:", addresses);

  let usdxAddr: `0x${string}` = usdtEthereumMain;
  let decimal = 6;
  let tokenSymbol = "tokenSymbol";
  const foundChain = findConfigChain(chainId);
  if (foundChain.err || !foundChain.chain) {
    console.error(foundChain.err);
    toast(JSON.stringify(foundChain.err));
  } else {
    usdxAddr = foundChain.chain.usdxAddr as `0x${string}`;
    decimal = foundChain.chain.usdxDecimal;
    tokenSymbol = foundChain.chain.tokenSymbol;
  }
  ll(`chainId: ${chainId}, usdxAddr: ${usdxAddr}`);

  //https://wagmi.sh/react/api/hooks/useReadContract
  //https://wagmi.sh/react/guides/read-from-contract
  const {
    data: balcTok,
    error,
    isError,
    isLoading,
    refetch,
    fetchStatus,
  } = useReadContract({
    abi: USDX,
    address: usdxAddr, // aDeployedCtrts.USDT_ADDR as `0x${string}`,
    //address: chainEthereumSepolia.usdxAddr as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
    chainId: chainId, //foundry.id, //sepolia.id
    query: {
      enabled: !!address,
    }, //dependency
    //account: "0x...",
    //config: createConfig({...})
  });
  //ll("balcTok:", balcTok, typeof balcTok);
  const [balcTokUi, balcTokUiSet] = useState("");
  useEffect(() => {
    const balcTokUi = tokBalcToFloatUi(balcTok, decimal, tokenSymbol);
    balcTokUiSet(balcTokUi);
  }, [balcTok, decimal, tokenSymbol]);

  const callRefetch = async () => {
    ll("callRefetch");
    const result = await refetch();
    //ll("refetch result:", result); //{data: balc, error, isError}
    if (result.isError) {
      toast(JSON.stringify(result.error));
    } else {
      ll("refetch: success. ", result.data);
    }
    const balcTokUi = tokBalcToFloatUi(result.data, decimal, tokenSymbol);
    ll("balcTokUi:", balcTokUi);
    balcTokUiSet(balcTokUi);
  };

  const {
    data: balcNative,
    error: errorNativeBalc,
    isError: isErrorNativeBalc,
  } = useBalance({
    address: address,
    chainId: chainId, // mainnet.id,
  });
  const balcNativeUi = nativeBalcToFloatUi(balcNative);

  const onSwitchSepolia = async () => {
    ll("onSwitchSepolia");
    await switchChain(providerConfig, { chainId: sepolia.id });
    location.reload();
  };
  const onSwitchFoundry = async () => {
    ll("onSwitchFoundry");
    await switchChain(providerConfig, { chainId: foundry.id });
    location.reload();
  };
  /*
0xFECD329d750D566f1A150fF51541aa303cb4a0fa USDT 
0x4Fa0fa59422e660B594156aC10c65dD166795353 USDC 
0x4802373E894e890A981DaE787532CBf01B5F4dD8 SLVC
0x7574b7AbD6175348F6Faa64d4829f19c1Ee33f04 GLDC  */
  return (
    <div className="border-2 border-t-blue-400">
      <Button onClick={onSwitchSepolia}>Switch to Ethereum Sepolia </Button>
      <Button onClick={onSwitchFoundry}>Switch to Foundry </Button>
      <Button onClick={callRefetch}>Refetch </Button>
      <span>isConnected: {isConnected ? "true" : "false"}</span>
      {". "}
      <span>address: {makeShortAddr(address)}</span>
      {". "}
      <span>
        chain: {chain !== undefined ? `${chain.name}` : ""}, chainId:{" "}
        {chainId ? `${chain?.id}` : ""}
      </span>
      {". "}
      <div>
        <span>
          Balance: {balcNativeUi}, {balcTokUi}
        </span>
        {isErrorNativeBalc && (
          <span>nativeBalc error: {`${errorNativeBalc}`}</span>
        )}
        {isError && <span>tokeenBalc error: {`${error}`}</span>}
      </div>
    </div>
  );
};

export default ReadErc20;
/* "bg-linear-to-r from-blue-400 to-purple-400"
              : "bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:scale-105 duration-300" */
