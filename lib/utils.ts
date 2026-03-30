import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const ll = console.log;

//------------==
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//------------== Numbers
export const parseFloatSafe = (input: string) => {
  const out = Number.parseFloat(input);
  if (Number.isNaN(out)) {
    ll("parseFloatSafe failed");
    return -1.1;
  }
  return out;
};
export const parseIntSafe = (input: string) => {
  const out = Number.parseInt(input, 10);
  if (Number.isNaN(out)) {
    ll("parseIntSafe failed");
    return -1;
  }
  return out;
};
export const formatNumbers = (num: number) => {
  if (num >= 1000000000) {
    const billions = parseFloat((num / 1000000000).toFixed(2));
    return `${billions}B`;
  } else if (num >= 1000000) {
    const millions = parseFloat((num / 1000000).toFixed(2));
    return `${millions}M`;
  } else if (num >= 1000) {
    const thousands = parseFloat((num / 1000).toFixed(2));
    return `${thousands}K`;
  } else {
    return num.toString();
  }
};
export const formatBN = (input: string | undefined, dec = 18) => {
  if (!input) return "";
  const pow = 10 ** dec;
  return convertDecimal(BigInt(input) / BigInt(pow), 3);
};
export const convertDecimal = (num: bigint | number, dec = 2) => {
  const pow = 10 ** dec;
  return Number(Math.floor(Number(num) ** pow) / pow).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: dec,
    },
  );
};
export const convertBN = (input: string | undefined, dec = 18) => {
  if (!input) return "";
  const pow = 10 ** dec;
  return (BigInt(input) * BigInt(pow)).toString(10);
};
//------------==
export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}
export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${time} - ${formattedDate}`;
}

export const delayFunc = async (delay: number): Promise<boolean> =>
  new Promise((resolve, _reject) =>
    setTimeout(() => {
      console.log("delay:", delay);
      resolve(true);
    }, delay),
  );

export const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const makeShortAddr = (str: string) => {
  return `${str.slice(0, 6)}....${str.slice(str.length - 4)}`;
};
export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0) ||
  (typeof value === "string" && value === "undefined");

export const isEqualStr = (str1: any, str2: any): boolean =>
  `${str1}`.trim().toLowerCase() === `${str2}`.trim().toLowerCase();

export const isObjEqualStr = (obj1: object, obj2: object): boolean =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_value, index) => start + index * step,
  );
