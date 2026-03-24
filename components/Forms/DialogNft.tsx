"use client";
import { useEffect, useState } from "react";
import { ll } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Field, FieldGroup } from "@/ui/field";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

type Props = {
  nftId: number;
  priceNative: bigint;
  priceToken: bigint;
};
export const DialogNft = ({ nftId, priceNative, priceToken }: Props) => {
  const _compoName = "BasicModal";
  //const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async () => {
    ll("onSubmit. nftId:", nftId);
    setIsLoading(true);
    setOpen(false);
    setIsLoading(false);
  };
  useEffect(() => {
    if (!open) {
      //form.reset();
    }
  }, [open]); //form

  const openDialog = () => {
    ll("openDialog");
  };
  //must encase the Context Menu or Dropdown Menu component in the Dialog component
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="!bg-primary text-light-2"
          onClick={() => openDialog()}
        >
          Buy NFT #{nftId}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy NFT #{nftId}</DialogTitle>
          <DialogDescription>
            Choose input token and blockchain. Confirm NFT ID and enter the
            required price. Click 'Buy' when you're ready.
          </DialogDescription>
        </DialogHeader>
        YOUR FORM HERE
        <div className="mt-0"></div>
        <Button
          type="submit"
          //isLoading={isLoading}
          disabled={isLoading}
          className="primary-color"
        >
          Buy Now
        </Button>
      </DialogContent>
    </Dialog>
  );
};
