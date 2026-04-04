import { useState } from "react";
import {
  useChainId,
  useConnection,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import USDX from "@/ethereumABIs/USDX.json";
import {
  evmAddrs,
  findConfigChain,
  usdtEthereumMain,
} from "@/lib/initconditions";
import { ll, toBigInt } from "@/lib/utils";
import { Button } from "./ui/button";

const WriteErc20 = () => {
  const chainId = useChainId();
  const [_loading, setLoading] = useState(false);
  const [inputAddr, setInputAddr] = useState("");
  const [amount, setAmount] = useState("");

  const {
    address,
    addresses,
    chain,
    chainId: chainIdViaConnection,
    isConnected,
  } = useConnection(); //its chainId is incorrect
  ll(
    `WriteErc20: chainId: ${chainId}, chainIdViaConnection: ${chainIdViaConnection}, address: ${address}, addressesLen: ${addresses?.length}`,
  );
  //ll("addresses:", addresses)
  if (chainIdViaConnection !== undefined && chainId !== chainIdViaConnection) {
    console.warn("chainId !== chainIdViaConnection");
  }

  let usdxAddr: `0x${string}` = usdtEthereumMain;
  let decimal = 6;
  const foundChain = findConfigChain(chainId);
  if (foundChain.err || !foundChain.chain) {
    console.error(foundChain.err);
  } else {
    usdxAddr = foundChain.chain.usdxAddr as `0x${string}`;
    decimal = foundChain.chain.usdxDecimal;
  }
  ll("WriteErc20 usdxAddr:", usdxAddr);

  //https://wagmi.sh/react/api/hooks/useWriteContract
  const {
    mutate,
    data: txHash,
    isPending,
    isError,
    error,
  } = useWriteContract();
  //const { mutate, data, isError, error } = useWriteContractSync(); // isPending, isSuccess,

  //https://wagmi.sh/react/api/hooks/useWaitForTransactionReceipt
  const {
    isSuccess: isSuccessReceipt,
    isPending: isPendingReceipt,
    isError: isErrorReceipt,
    error: errorReceipt,
  } = useWaitForTransactionReceipt({
    hash: txHash,
    chainId, //sepolia.id, mainnet.id
    //confirmations: 2,
    //pollingInterval: 1_000,
    //config: config
  });
  ll(
    `WriteErc20 isPending: ${isPending}, isPendingReceipt: ${isPendingReceipt}`,
  );

  //TODO: Udemy course@5.55
  const onBtnClick = async () => {
    setLoading(true);
    const amount1 = toBigInt(amount, decimal);
    ll(
      `onBtnClick()... inputAddr: ${inputAddr}, amount: ${amount} ${amount1}, chainId: ${chainId}, isPending: ${isPending}, isPendingReceipt: ${isPendingReceipt}`,
    );
    try {
      mutate({
        abi: USDX,
        address: usdxAddr, // aDeployedCtrts.USDT_ADDR as `0x${string}`,
        functionName: "transfer",
        args: [inputAddr, amount1],
        account: address,
        chainId, //foundry.id,
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="border-2 border-t-blue-400">
      <div>
        <span className="">Wallet 1: {evmAddrs.addr1}</span>
        <div>
          <span>Wallet 2: {evmAddrs.addr2}</span>
        </div>
        <span>chainId: {chainId}</span>
      </div>

      <div className="flex">
        <input
          type="text"
          value={inputAddr}
          placeholder="to 0x7099"
          onChange={(e) => setInputAddr(e.target.value)}
        />
        <input
          type="text"
          value={amount}
          placeholder="amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          type="button"
          onClick={onBtnClick}
          disabled={isPending && isPendingReceipt}
          className="bg-linear-to-r from-blue-400 to-purple-400 hover:from-orange-700 hover:scale-105 duration-300"
        >
          Send Txn
        </Button>
      </div>
      <div className="">
        {isError && <span>{`${error?.message}`}</span>}
        {txHash && <span>{txHash}</span>}

        {isErrorReceipt && <span>{`${errorReceipt?.message}`}</span>}
        {isSuccessReceipt && <span>Txn Success</span>}
      </div>
    </div>
  );
};
export default WriteErc20;
