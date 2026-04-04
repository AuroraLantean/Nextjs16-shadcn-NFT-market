import { switchChain } from "@wagmi/core";
import { foundry, sepolia } from "viem/chains";
import { useChainId, useConnection, useReadContract } from "wagmi";
import USDX from "@/ethereumABIs/USDX.json";
import { findConfigChain, usdtEthereumMain } from "@/lib/initconditions";
import { ll, makeShortAddr } from "@/lib/utils";
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
  } else {
    usdxAddr = foundChain.chain.usdxAddr as `0x${string}`;
    decimal = foundChain.chain.usdxDecimal;
    tokenSymbol = foundChain.chain.tokenSymbol;
  }
  ll("usdxAddr:", usdxAddr);

  //https://wagmi.sh/react/api/hooks/useReadContract
  //https://wagmi.sh/react/guides/read-from-contract
  const {
    data: balance,
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
  ll("balance:", balance, typeof balance);
  const balcUi = balance
    ? (BigInt(balance as bigint) / BigInt(10 ** decimal)).toString()
    : "";

  const onSwitchSepolia = async () => {
    ll("onSwitchSepolia");
    await switchChain(providerConfig, { chainId: sepolia.id });
  };
  const onSwitchFoundry = async () => {
    ll("onSwitchFoundry");
    await switchChain(providerConfig, { chainId: foundry.id });
  };
  return (
    <div className="border-2 border-t-blue-400">
      <Button onClick={onSwitchSepolia}>Switch to Ethereum Sepolia </Button>
      <Button onClick={onSwitchFoundry}>Switch to Foundry </Button>
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
          {tokenSymbol} Balance: {balcUi}
        </span>
        {isError && <span>reading error: {`${error}`}</span>}
      </div>
    </div>
  );
};

export default ReadErc20;
/* "bg-linear-to-r from-blue-400 to-purple-400"
              : "bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:scale-105 duration-300" */
