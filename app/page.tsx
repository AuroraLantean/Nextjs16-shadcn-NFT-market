"use client";
//import { ConnectButton } from "@rainbow-me/rainbowkit";
import { metaMask } from "wagmi/connectors";
import CarouselNft from "@/components/CarouselNft";
import TanstackForm1 from "@/components/Forms/TanstackForm1";

export default function Home() {
  return (
    <div className="">
      <CarouselNft />
      <TanstackForm1 />
    </div>
  );
}
/*
    <ReactHookForm1 />
    <Button disabled>
      <Spinner aria-hidden="true" />
      Please wait
    </Button>
 */
