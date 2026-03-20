import Card from "@/components/Card";
import CardImage from "@/components/CardImage";
import { cn } from "@/styles/lib/utils";
import { Button } from "@/ui/button";

type Props = {
  title: string;
  imgUrl: string;
  detail: string;
  price: number;
  className?: string;
  //children: React.ReactNode;
};
const NftCard = ({
  title,
  imgUrl,
  detail,
  price,
  className,
  ...props
}: Props) => {
  return (
    <div className={cn(className)} {...props}>
      <Card variant="default" size="large">
        {title && <h3 className="text-3xl font-extrabold mb-1">{title}</h3>}
        {imgUrl && <CardImage src={imgUrl} />}
        {detail && <div className="mb-1">{detail}</div>}

        <div className="flex">
          <span className="text-2xl font-bold text-blue-700">
            Price: ${price}
          </span>

          <Button className="ml-4 text-xl  bg-blue-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
            Buy Now
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NftCard;
