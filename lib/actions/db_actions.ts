"use server";

import type z from "zod";
import { projectSchema } from "../schemas";

export async function createProject(unsafeData: z.infer<typeof projectSchema>) {
  const data = projectSchema.safeParse(unsafeData);

  if (!data.success) return { success: false };

  // Save to DB

  return { success: true };
}
