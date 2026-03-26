"use client";
import { useAtom, useAtomValue } from "jotai";
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
import WalletMenu from "../WalletMenu";

export const DialogWallet = () => {
  const _compoName = "DialogWallet";
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false); //setOpen is a function for Dialog to export its open/close state

  const onSubmit = async () => {
    ll("onSubmit");
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
          Connect
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-extrabold">Connect a Wallet</DialogTitle>
          <DialogDescription>Choose a wallet</DialogDescription>
        </DialogHeader>
        <div className="mt-0 flex-col">
          <WalletMenu />
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
