import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  aspectRatio?: "portrait" | "square";
  className?: string;
};
const CardImage = ({
  src,
  alt = "CardImage",
  width = 512,
  height = 512,
  aspectRatio = "square",
  className = "",
}: Props) => {
  return (
    <div className={`w-full h-48 overflow-hidden rounded-lg`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="eager"
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-3/4" : "aspect-square",
            className,
          )}
        />
      ) : (
        <div className="w-full h-full bg-linear-to-r from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="text-gray-400 text-sm">No image available</span>
        </div>
      )}
    </div>
  );
};

export default CardImage;
