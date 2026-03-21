export const buyNow = async () => {
  "use server";
  console.log("buy_now");
};

export const parseFloatSafe = (input: string) => {
  const out = Number.parseFloat(input);
  if (Number.isNaN(out)) {
    console.error("parseFloatSafe failed");
    return -1.1;
  }
  return out;
};
export const parseIntSafe = (input: string) => {
  const out = Number.parseInt(input, 10);
  if (Number.isNaN(out)) {
    console.error("parseIntSafe failed");
    return -1;
  }
  return out;
};
