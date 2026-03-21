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

export const buyNow = async () => {
  "use server";
  console.log("buy_now");
};
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
            key={dragon.id}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-2">
                  <NftCard
                    name={dragon.name}
                    imgUrl={dragon.imgUrl}
                    detail={dragon.detail}
                    price={dragon.price}
                    buyNow={buyNow}
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
