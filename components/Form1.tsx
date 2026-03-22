"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  type FieldErrors,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { saveForm1 } from "@/lib/actions/db_actions";
import { form1Schema, PROJECT_STATUSES } from "@/lib/schemas";
import { ll } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/ui/field";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";

//See Shadcn-field-component-main repo
//https://ui.shadcn.com/docs/forms/react-hook-form
export default function Form1() {
  const form1 = useForm({
    // biome-ignore lint/suspicious/noExplicitAny: <https://github.com/react-hook-form/resolvers/issues/842>
    resolver: zodResolver(form1Schema as any),
    defaultValues: {
      name: "",
      description: "",
      status: "draft" as const,
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

  const onSubmit = async (data: z.infer<typeof form1Schema>) => {
    ll("onSubmit");
    const res = await saveForm1(data);
    ll("res:", res);
    if (res.success) {
      form1.reset();
      toast.success("Project created successfully!", {
        description: JSON.stringify(data, null, 2),
        className: "whitespace-pre-wrap font-mono",
        position: "top-right",
      });
    } else {
      toast.error("Failed to create project.", {
        position: "top-right",
      });
    }
  }; //1120
  const validationFailed = (e: FieldErrors) => {
    ll("validationFailed:", e);
  };
  return (
    <div className="container px-4 mx-auto my-6">
      <form
        id="form1"
        onSubmit={form1.handleSubmit(onSubmit, validationFailed)}
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form1.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/*1242  add Controller with different name and FieldLable */}
          <Controller
            name="status"
            control={form1.control}
            render={({ field: { onChange, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                <Select {...field} onValueChange={onChange}>
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    onBlur={field.onBlur}
                    id={field.name}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form1.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <FieldDescription>
                    Be as detailed as possible
                  </FieldDescription>
                </FieldContent>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" form="form1">
            Submit
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
