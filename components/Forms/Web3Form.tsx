"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BaseError, erc20Abi, type Hash } from "viem";
import { sepolia } from "viem/chains";
import {
  useAccount,
  useChainId,
  useConnect,
  useConnection,
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Spinner } from "@/ui/spinner";

type TokenData = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
};

export const Erc20 = () => {
  const [amount, setAmount] = useState("");
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenData>({
    address: "0x...",
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
  });

  const chainId = useChainId();
  const { writeContract, data: tx, isError, error } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash: tx });

  const [input, setInput] = useState("");
  const { data, refetch, fetchStatus } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: selectedToken.address as Hash,
        functionName: "balanceOf",
        args: [address as Hash],
      },
    ],
  });
  if (chainId !== sepolia.id) {
    return (
      <div className="h-[60vh] text-5xl text-center font-semibold text-blue-600 mb-2">
        Please switch to Sepolia
      </div>
    );
  }
  //2803
  return <div>Erc20</div>;
};
