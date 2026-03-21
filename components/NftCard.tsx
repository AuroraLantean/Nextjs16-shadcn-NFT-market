"use client";
import Card from "@/components/Card";
import CardImage from "@/components/CardImage";
import { cn } from "@/styles/lib/utils";
import { Button } from "@/ui/button";

type Props = {
  name: string;
  imgUrl: string;
  detail: string;
  price: number;
  buyNow: () => void;
  className?: string;
  //children: React.ReactNode;
};
const NftCard = ({
  name,
  imgUrl,
  detail,
  price,
  buyNow,
  className,
  ...props
}: Props) => {
  return (
    //leading-none: set the line height of an element equal to its font size:
    //text-muted-foreground
    <div className={cn(className)} {...props}>
      <Card variant="default" size="large">
        {name && <h3 className="text-2xl font-extrabold mb-1">{name}</h3>}
        {imgUrl && <CardImage src={imgUrl} />}
        {detail && <div className="mb-1">{detail}</div>}

        <div className="flex">
          <span className="text-2xl font-bold text-blue-700">
            Price: ${price}
          </span>

          <Button
            onClick={buyNow}
            className="ml-4 text-xl  bg-blue-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Buy Now
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NftCard;
