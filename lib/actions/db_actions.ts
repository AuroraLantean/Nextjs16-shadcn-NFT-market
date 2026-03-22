"use server";

import type z from "zod";
import { form1Schema } from "../schemas";
import { ll } from "../utils";

export const buyNow = async () => {
  ll("buy_now");
};

export async function saveForm1(unsafeData: z.infer<typeof form1Schema>) {
  ll("saveForm1. unsafeData:", unsafeData);
  const parsedData = form1Schema.safeParse(unsafeData);
  ll("parsedData:", parsedData);
  if (!parsedData.success) return { success: false };

  // Save to DB

  return { success: true };
}
