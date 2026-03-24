import CarouselNft from "@/components/CarouselNft";
import { DialogNft } from "@/components/Forms/DialogNft";
import TanstackForm1 from "@/components/Forms/TanstackForm1";

export default function Home() {
  const dialogProps = {
    nftId: 1,
    priceNative: 1n,
    priceToken: 30n,
  };
  return (
    <div className="">
      <CarouselNft />
      <DialogNft {...dialogProps} />
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
