"use client";

import CarouselNft from "@/components/CarouselNft";
import TanstackForm1 from "@/components/Forms/TanstackForm1";
import ReadErc20 from "@/components/ReadErc20";
import { WagmiButton } from "@/components/WagmiButtons";

export default function Home() {
  return (
    <div className="">
      <div className="border-2">
        <WagmiButton />
        <ReadErc20 />
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
