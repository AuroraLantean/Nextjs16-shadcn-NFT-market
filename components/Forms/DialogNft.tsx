"use client";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { chainIndexAtom, chainsAtom } from "@/lib/jotaiStates";
import { ll } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { FieldLabel } from "@/ui/field";

type Props = {
  nftId: number;
  price: number;
};
export const DialogNft = ({ nftId, price }: Props) => {
  const _compoName = "DialogNft";
  const [chainIndex, setChainIndexAtom] = useAtom(chainIndexAtom);
  const [chainConfig, setChainConfig] = useAtom(chainsAtom);
  if (!chainConfig[chainIndex]) throw new Error("chainIndex invalid");
  const { blockchain, acceptedTokSymbol, contractAddr } =
    chainConfig[chainIndex];

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false); //setOpen is a function for Dialog to export its open/close state

  const onSubmit = async () => {
    ll("onSubmit. nftId:", nftId);
    setIsLoading(true);

    const err = "xyz";
    const hash = "";
    if (err || !hash) {
      toast.error(`Your transaction has failed with err: ${err}`, {
        position: "top-right",
      });
    } else {
      toast.success(
        `Your transaction has been submitted successfully with hash ${hash}`,
        {
          //description: JSON.stringify(data, null, 2),
          className: "whitespace-pre-wrap font-mono",
          position: "top-right",
        },
      );
      setOpen(false);
    }
    setIsLoading(false);
  };

  /*useEffect(() => {
    if (!open) { form.reset();  }
  }, [open]); */

  //must wrap the Context Menu or Dropdown Menu component in the Dialog component
  //setOpen is to export Dialog open/close state, and to close the Dialog if the txn is successful
  //bg-primary! text-light-2
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => ll("click on DialogBtn")}
          className="ml-4 text-xl  bg-blue-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
        >
          Buy Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-extrabold">Buy NFT</DialogTitle>
          <DialogDescription>
            Choose input token and blockchain. Confirm NFT ID and enter the
            required price. Click 'Buy' when you're ready.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-0 flex-col">
          <FieldLabel>NFT ID: {nftId}</FieldLabel>
          <FieldLabel>
            Price: {price} {acceptedTokSymbol}
          </FieldLabel>
          <FieldLabel>Contract Address: {contractAddr}</FieldLabel>
          <FieldLabel>Blockchain: {blockchain.toUpperCase()}</FieldLabel>
        </div>
        <Button
          type="submit"
          onClick={() => ll("click on DialogSubmitBtn")}
          disabled={isLoading}
          className="primary-color"
        >
          Buy Now
        </Button>
      </DialogContent>
    </Dialog>
  );
};
