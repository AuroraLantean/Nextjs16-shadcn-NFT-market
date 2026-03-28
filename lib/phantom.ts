import {
  type EthTransactionRequest,
  useConnect,
  useEthereum,
  useSolana,
} from "@phantom/react-sdk";
import type { Transaction, VersionedTransaction } from "@phantom/sdk-types";

export const phantomSolSignAndSendTxn = async (
  txn: Transaction | VersionedTransaction,
) => {
  const { solana } = useSolana();
  const result = await solana.signAndSendTransaction(txn);
  console.log("Transaction sent:", result.signature);
  return result.signature;
};
export const phantomSolSignTxn = async (
  transaction: Transaction | VersionedTransaction,
) => {
  const { solana } = useSolana();
  // Just sign (without sending) - Note: Not supported for embedded wallets
  const signedTx = await solana.signTransaction(transaction);
  console.log("Signed transaction:", signedTx);
  return signedTx;
};

/* ethTxn = { to: "0x742d35Cc6634C0532925a3b8D4C8db86fB5C4A7E",
value: "1000000000000000000", // 1 ETH in wei
gas: "21000" }*/
export const sendPhantomEthTxn = async (txn: EthTransactionRequest) => {
  const { ethereum } = useEthereum();
  const result = await ethereum.sendTransaction(txn);
  return result;
};
