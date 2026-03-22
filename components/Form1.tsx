"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { saveForm1 } from "@/lib/actions/db_actions";
import { form1Schema } from "@/lib/schemas";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";

export default function Form1() {
  const form1 = useForm({
    // biome-ignore lint/suspicious/noExplicitAny: <https://github.com/react-hook-form/resolvers/issues/842>
    resolver: zodResolver(form1Schema as any),
    defaultValues: {
      name: "",
      // status: "draft" as const,
      // description: "",
      // notifications: {
      //   email: false,
      //   sms: false,
      //   push: false,
      // },
      // users: [{ email: "" }],
    },
  });

  const {
    fields: users,
    append: addUser,
    remove: removeUser,
  } = useFieldArray({
    control: form1.control,
    name: "users",
  });

  async function onSubmit(data: z.infer<typeof form1Schema>) {
    const res = await saveForm1(data);

    if (res.success) {
      form1.reset();
      toast.success("Project created successfully!", {
        description: JSON.stringify(data, null, 2),
        className: "whitespace-pre-wrap font-mono",
      });
    } else {
      toast.error("Failed to create project.");
    }
  } //625
  return (
    <div className="container px-4 mx-auto my-6">
      <form onSubmit={form1.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form1.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>My Form</FieldLabel>
                <Input />
                <FieldError errors={[{ message: "error" }]} />
              </Field>
            )}
          ></Controller>
        </FieldGroup>
      </form>
    </div>
  );
}
