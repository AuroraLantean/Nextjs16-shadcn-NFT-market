import { useReadContract } from "wagmi";
import { ll } from "@/lib/utils";
//connectkit at video 2743
//https://wagmi.sh/react/api/hooks/useReadContract

//https://etherscan.io/token/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2
export const abiFBA3912 = {
  address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
  abi: [
    {
      type: "function",
      name: "balanceOf",
      stateMutability: "view",
      inputs: [{ name: "account", type: "address" }],
      outputs: [{ type: "uint256" }],
    },
    {
      type: "function",
      name: "totalSupply",
      stateMutability: "view",
      inputs: [],
      outputs: [{ name: "supply", type: "uint256" }],
    },
  ],
} as const;
const ReadErc20 = () => {
  ll("ReadErc20...");
  const { data: balance } = useReadContract({
    //...erc20JSON,
    ...abiFBA3912,
    functionName: "balanceOf",
    args: ["0x03A71968491d55603FFe1b11A9e23eF013f75bCF"],
  });
  ll("balance:", balance);
  return <div>Balance: {balance?.toString()}</div>;
};

export default ReadErc20;
/*  const result = useReadContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'balanceOf',
    args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
    account: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  }) */
