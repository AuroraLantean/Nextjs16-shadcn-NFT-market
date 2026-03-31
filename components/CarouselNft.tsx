import { useAtom } from "jotai";
import { useEffect } from "react";
import { errAtom } from "@/lib/jotaiStates";
import { ll } from "@/lib/utils";
import { Card, CardContent } from "@/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/carousel";
import { dragons } from "../mockdata/data";
import NftCard from "./NftCard";

//In 2026, React 19.2 (NextJs 16.2) has good enough useEffect to prevent repeated code running, so window.addEventListern("load", callbackFunction) is no longer needed. When a component gets rendered many times, but its useEffect() runs only once. So get all the blockchain data inside useEffect() inside a blockchain component, store those data into a client state management, and pass the data to the other components.
const CarouselNft = () => {
  ll("CarouselNft...");
  const [_err, _setErr] = useAtom(errAtom);
  const _res = { err: "" };
  useEffect(() => {
    const run = async () => {
      //res = await evmGuestRpcProvider();
      //if (res.err) setErr(res.err);
    };
    run();
    return () => {
      ll("CarouselNft dep changed");
    };
  }, []);
  //Carousel: set Carousel width = w-full
  // max-w-48 sm:max-w-lg md:max-w-lg
  //CarouselItem: set item number to show
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {dragons.map((dragon) => (
          <CarouselItem
            key={dragon.nftId}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-2">
                  <NftCard
                    className="bg-yellow-400 dark:bg-green-400"
                    {...dragon}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselNft;
