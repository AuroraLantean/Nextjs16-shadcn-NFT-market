import NftCard from "@/components/NftCard";

type DragonT = {
  title: string;
  imgUrl: string;
  detail: string;
  price: number;
};

export default function Home() {
  const dragon1: DragonT = {
    title: "Woogoo",
    imgUrl: "/dragons/be9b8e5d-3840-4e37-92f0-dc57081c3014.png",
    detail: "mysterious one",
    price: 300,
  };
  return (
    <div className="">
      <NftCard
        title={dragon1.title}
        imgUrl={dragon1.imgUrl}
        detail={dragon1.detail}
        price={dragon1.price}
      />
    </div>
  );
}
