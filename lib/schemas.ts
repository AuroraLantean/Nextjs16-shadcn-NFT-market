import * as z from "zod";

//https://zod.dev/basics
export const PROJECT_STATUSES = ["draft", "active", "finished"] as const;

export const form1Schema = z.object({
  name: z.string().min(1),
  description: z
    .string()
    .optional()
    .transform((v) => v || undefined), //so not to store "" in db!
  status: z.enum(PROJECT_STATUSES),
  //amount: z.number(),
  /*
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
  }),
  users: z
    .array(z.object({ email: z.email() }))
    .min(1)
    .max(5),*/
});
