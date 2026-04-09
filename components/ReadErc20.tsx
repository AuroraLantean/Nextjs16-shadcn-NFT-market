import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useBalance,
  useChainId,
  useChains,
  useConnection,
  useReadContract,
  useSwitchChain,
} from "wagmi";
import USDX from "@/ethereumABIs/USDX.json";
import { findConfigChain, usdtEthereumMain } from "@/lib/initconditions";
import { txnNumAtom } from "@/lib/jotaiStates";
import {
  ll,
  makeShortAddr,
  nativeBalcToFloatUi,
  tokBalcToFloatUi,
} from "@/lib/utils";
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
  ll(`chainId: ${chainId}, usdxAddr: ${makeShortAddr(usdxAddr)}`);

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
  const [txnNum, _setTxnNum] = useAtom(txnNumAtom);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  useEffect(() => {
    if (txnNum > 0) {
      ll("ReadErc20 useEffect on callRefetch");
      callRefetch();
    }
  }, [txnNum]);

  const {
    data: balcNative,
    error: errorNativeBalc,
    isError: isErrorNativeBalc,
    refetch: refetchNative,
  } = useBalance({
    address: address,
    chainId: chainId, // mainnet.id,
  });
  const balcNativeUi = nativeBalcToFloatUi(balcNative);

  //https://wagmi.sh/react/api/hooks/useSwitchChain
  const switchChain = useSwitchChain();
  const chains = useChains();
  //TODO: add NFT buy button
  const onSwitchChain = async (chainId: number) => {
    ll("onSwitchChain");
    switchChain.mutate({ chainId: chainId });
    location.reload();
  };
  return (
    <div className="border-2 border-t-blue-400">
      <div>
        <span>Click on Sepolia if your wallet is currently not on Sepolia</span>{" "}
        {chains.map((chain) => (
          <Button
            type="button"
            key={chain.id}
            onClick={() => onSwitchChain(chain.id)}
          >
            {chain.name}
          </Button>
        ))}
      </div>

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
