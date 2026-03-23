"use client";

//https://tanstack.com/form/latest/docs/overview
import { toast } from "sonner";
import type z from "zod";
import { saveForm1 } from "@/lib/actions/db_actions";
import { form1Schema, PROJECT_STATUSES } from "@/lib/schemas";
import { ll } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/ui/field";
import { useAppForm } from "./TanstackFormController";

type FormData = z.infer<typeof form1Schema>;

const TanstackForm1 = () => {
  const form1 = useAppForm({
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
          <form1.AppField name="name">
            {(field) => <field.TextField label="Name" />}
          </form1.AppField>

          <form1.AppField name="description">
            {(field) => (
              <field.Textarea
                label="Description"
                description="Be as specific as possible"
              />
            )}
          </form1.AppField>

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
