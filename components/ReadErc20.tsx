import { useReadContract } from "wagmi";
import aDeployedCtrts from "@/ethereumABIs/aDeployedCtrts.json";
import USDX from "@/ethereumABIs/USDX.json";
import { ll } from "@/lib/utils";

//connectkit at video 2743
//https://wagmi.sh/react/api/hooks/useReadContract
const ReadErc20 = () => {
  ll("ReadErc20..");

  const {
    data: balance,
    refetch,
    fetchStatus,
  } = useReadContract({
    address: aDeployedCtrts.USDT_ADDR as `0x${string}`,
    //address: chainEthereumSepolia.usdtAddr as `0x${string}`,
    abi: USDX,
    functionName: "balanceOf",
    args: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
    //account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  });
  ll("balance:", balance);
  return <div>Balance: {balance?.toString()}</div>;
};

export default ReadErc20;
/* loading? "bg-gradient-to-r from-blue-400 to-purple-400" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:scale-105 duration-300"  */
