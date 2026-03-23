"use client";

//https://tanstack.com/form/latest/docs/overview
import { useForm } from "@tanstack/react-form";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import type z from "zod";
import { saveForm1 } from "@/lib/actions/db_actions";
import { form1Schema, PROJECT_STATUSES } from "@/lib/schemas";
import { ll } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/ui/input-group";
import { SelectItem } from "@/ui/select";
import { Input } from "./ui/input";

type FormData = z.infer<typeof form1Schema>;

const TanstackForm1 = () => {
  const form1 = useForm({
    defaultValues: {
      name: "",
      description: "",
      status: "draft" as const,
      notifications: {
        email: false,
        sms: false,
        push: false,
      },
      users: [{ email: "" }],
    } satisfies FormData as FormData,
    validators: {
      onSubmit: form1Schema, //no optional in Zod
    },
    onSubmit: async ({ value }) => {
      ll("onSubmit");
      const res = await saveForm1(value);
      ll("res:", res);
      if (res.success) {
        form1.reset();
        toast.success("Project created successfully!", {
          description: JSON.stringify(value, null, 2),
          className: "whitespace-pre-wrap font-mono",
          position: "top-right",
        });
      } else {
        toast.error("Failed to create project.", {
          position: "top-right",
        });
      }
    },
  });

  return (
    <div className="container px-4 mx-auto my-6">
      <form
        id="form1"
        onSubmit={(e) => {
          e.preventDefault();
          form1.handleSubmit(); //to call useForm onSubmit()
        }}
      >
        <FieldGroup>
          <form1.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form1.Field>

          {/*5154 */}
          <FieldSet>
            <FieldContent>
              <FieldLegend>Notifications</FieldLegend>
              <FieldDescription>
                Select how you would like to receive notifications.
              </FieldDescription>
            </FieldContent>

            <FieldGroup data-slot="checkbox-group"></FieldGroup>
          </FieldSet>

          {/*2300 dynamic array of objects 
          FieldLegend variant="label" ... for size
          */}
          <FieldSeparator />

          <Button type="submit" form="form1">
            Submit
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};
export default TanstackForm1;
