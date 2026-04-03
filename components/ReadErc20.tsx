import { useChainId, useConnection, useReadContract } from "wagmi";
import aDeployedCtrts from "@/ethereumABIs/aDeployedCtrts.json";
import USDX from "@/ethereumABIs/USDX.json";
import { ll, makeShortAddr } from "@/lib/utils";

//connectkit at video 2743
//https://wagmi.sh/react/api/hooks/useReadContract
const ReadErc20 = () => {
  const chainId = useChainId();
  const { address, addresses, chain, isConnected } = useConnection(); //its chainId is incorrect
  ll(
    `ReadErc20: ${address}, chain: ${chain?.name}, chainId: ${chainId}, isConnected: ${isConnected}, addressesLen: ${addresses?.length}`,
  );
  //ll("addresses:", addresses);

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
    address: aDeployedCtrts.USDT_ADDR as `0x${string}`,
    //address: chainEthereumSepolia.usdtAddr as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
    chainId: chainId, //foundry.id, //sepolia.id
    query: {
      enabled: !!address,
    }, //dependency
    //account: "0x...",
    //config: createConfig({...})
  });
  ll("balance:", balance);
  return (
    <div>
      <span>isConnected: {isConnected ? "true" : "false"}</span>
      {". "}
      <span>address: {makeShortAddr(address)}</span>
      {". "}
      <span>
        chain: {chain !== undefined ? `${chain.name}` : ""}, chainId:{" "}
        {chainId ? `${chainId}` : ""}
      </span>
      {". "}
      <span>error: {error ? `${error}` : ""}</span>
      {". "}
      <span>Balance: {balance?.toString()}</span>
    </div>
  );
};

export default ReadErc20;
/* loading? "bg-gradient-to-r from-blue-400 to-purple-400" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:scale-105 duration-300"  */
