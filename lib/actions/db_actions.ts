"use server";

import type z from "zod";
import { form1Schema } from "../schemas";
import { ll } from "../utils";

export const buyNow = async () => {
  ll("buy_now");
};

export async function saveForm1(unsafeData: z.infer<typeof form1Schema>) {
  const data = form1Schema.safeParse(unsafeData);

  if (!data.success) return { success: false };

  // Save to DB

  return { success: true };
}
