"use client";
import Card from "@/components/Card1";
import CardImage from "@/components/CardImage";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { DialogNft } from "./Forms/DialogNft";

type Props = {
  nftId: number;
  name: string;
  imgUrl: string;
  detail: string;
  price: number;
  className?: string;
  //children: React.ReactNode;
};
const NftCard = ({
  nftId,
  name,
  imgUrl,
  detail,
  price,
  className,
  ...props
}: Props) => {
  return (
    //leading-none: set the line height of an element equal to its font size:
    //text-muted-foreground
    <div className="" {...props}>
      <Card className={cn(className)} variant="default" size="large">
        {name && (
          <h3 className="text-2xl font-extrabold mb-1">
            {name} id: {nftId}
          </h3>
        )}
        {imgUrl && <CardImage src={imgUrl} />}
        {detail && <div className="mb-1">{detail}</div>}

        <div className="flex">
          <span className="text-2xl font-bold text-blue-700">
            Price: ${price}
          </span>

          <DialogNft nftId={nftId} price={price} />
        </div>
      </Card>
    </div>
  );
};

export default NftCard;
