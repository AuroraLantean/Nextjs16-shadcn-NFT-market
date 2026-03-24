import { tokenSymbol } from "@/lib/utils";
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

const CarouselNft = () => {
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
