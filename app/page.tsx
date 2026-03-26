"use client";
import { useConnection } from "wagmi";

import CarouselNft from "@/components/CarouselNft";
import TanstackForm1 from "@/components/Forms/TanstackForm1";
import WalletButton from "@/components/WalletButton";

export default function Home() {
  const connection = useConnection();

  return (
    <div className="">
      <div className="border-2">
        {connection.status === "disconnected" && (
          <div className="flex">
            <span>Connect: </span>
            <WalletButton />
          </div>
        )}
        {connection.status === "connected" && (
          <div>
            addresses: {JSON.stringify(connection.addresses)}
            <br />
            chainId: {connection.chainId}
          </div>
        )}
      </div>

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
