import { parseIntSafe } from "@/lib/utils";

export type DragonT = {
  nftId: number;
  name: string;
  artist: string;
  category: string;
  imgUrl: string;
  detail: string;
  price: number;
};
export const dragon1: DragonT = {
  nftId: 10,
  name: "Woogoo",
  artist: "longsun",
  category: "mysterious",
  imgUrl: "/dragons/be9b8e5d-3840-4e37-92f0-dc57081c3014.png",
  detail: "mysterious one",
  price: 300,
};

//export type nftT = Pick<DragonT, "nftId"> & Partial<DragonT>
export type nftT = Partial<DragonT> & { nftId: number };
export const extractNftIds = (nfts: nftT[]) => {
  const nftIdArray = nfts.map((item) => parseIntSafe(`${item.nftId}`));
  return nftIdArray;
};

export type contractT = {
  address: string;
  name: string;
  symbol: string;
};
/* export const localDp6contracts: contractT[] = [
  {
    name: "usdt", symbol: "usdt", address: "0xbdEd0D2bf404bdcBa897a74E6657f1f12e5C6fb6",
  },
]
export const sepoliaDp6contracts: contractT[] = [
  {
    name: "usdt", symbol: "usdt", address: "",
  },
] */
export const soldout = "/kisspng-sold512x375.png";
export const dragons: DragonT[] = [
  {
    nftId: 0,
    name: "Rendezvous",
    artist: "Ethan Byte",
    category: "dragon",
    detail: "will meet you at unexpected time...",
    imgUrl: "/dragons/0c1987f8-42aa-46d8-9d2d-98e5b7bb5d7f.png",
    price: 300,
  },
  {
    nftId: 1,
    name: "Awakening",
    artist: "Nina Netcode",
    category: "dragon",
    detail: "will attack you at night in your bed",
    imgUrl: "/dragons/8e25da39-6895-4ad4-88b2-34a31ac1bfa4.png",
    price: 320,
  },
  {
    nftId: 2,
    name: "Dreadful",
    artist: "Lena Logic",
    category: "dragon",
    detail: "can tear anything apart into pieces",
    imgUrl: "/dragons/41a691af-f4c3-4242-a223-5b0796b603ec.png",
    price: 373,
  },
  {
    nftId: 3,
    name: "Predator",
    artist: "Beth Binary",
    category: "dragon",
    detail: "will hunt anything down day or night",
    imgUrl: "/dragons/65f6e1c0-f76d-4a1e-869e-dfa6011eaeea.png",
    price: 324,
  },
  {
    nftId: 4,
    name: "Mystical",
    artist: "Lena Logic",
    category: "dragon",
    detail: "can summon mystical powers",
    imgUrl: "/dragons/8599b949-2f76-4ec5-91b6-1a9a6fae3867.png",
    price: 398,
  },
  {
    nftId: 5,
    name: "Sea Hunter",
    artist: "Lena Logic",
    category: "dragon",
    detail: "can dive into the abyss in sea",
    imgUrl: "/dragons/a4a4b0a8-f0a8-4bb7-9b72-c43153390d47.png",
    price: 313,
  },
  {
    nftId: 6,
    name: "Air Terror",
    artist: "Lena Logic",
    category: "dragon",
    detail: "can fly into the sky and beyond",
    imgUrl: "/dragons/b45006c8-2a7a-4950-89f8-bded7fc4dcad.png",
    price: 426,
  },
  {
    nftId: 7,
    name: "Fire Beast",
    artist: "Luna punk",
    category: "dragon",
    detail: "will rain fire balls on you if you feel cold",
    imgUrl: "/dragons/dragonBreathFire521x512.png",
    price: 479,
  },
];
