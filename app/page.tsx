"use client";

import CarouselNft from "@/components/CarouselNft";
import TanstackForm1 from "@/components/Forms/TanstackForm1";
import ReadErc20 from "@/components/ReadErc20";
import { WagmiButton } from "@/components/WagmiButtons";
import WriteErc20 from "@/components/WriteErc20";

export default function Home() {
  return (
    <div className="">
      <div className="border-2">
        <div>
          1. Go to your wallet and select the account you want to connect
        </div>
        <div>2. Click on a wallet below to connect your wallet</div>
        <WagmiButton />
        <ReadErc20 />
        <WriteErc20 />
      </div>

      <CarouselNft />
      <TanstackForm1 />
    </div>
  );
}
/*       <PhantomButton />
    <ReactHookForm1 />
    <Button disabled>
      <Spinner aria-hidden="true" />
      Please wait
    </Button>
 */
