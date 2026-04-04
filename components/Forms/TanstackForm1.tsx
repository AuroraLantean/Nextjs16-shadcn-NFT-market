"use client";

import { XIcon } from "lucide-react";
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
import { useAppForm } from "./TanstackFormController";

//https://tanstack.com/form/latest/docs/overview
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

          <form1.AppField name="status">
            {(field) => (
              <field.Select label="Status">
                {PROJECT_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          </form1.AppField>

          <form1.AppField name="description">
            {(field) => (
              <field.Textarea
                label="Description"
                description="Be as specific as possible"
              />
            )}
          </form1.AppField>

          <FieldSet>
            <FieldContent>
              <FieldLegend>Notifications</FieldLegend>
              <FieldDescription>
                Select how you would like to receive notifications.
              </FieldDescription>
            </FieldContent>

            <FieldGroup data-slot="checkbox-group">
              <form1.AppField name="notifications.email">
                {(field) => <field.Checkbox label="Email" />}
              </form1.AppField>

              <form1.AppField name="notifications.sms">
                {(field) => <field.Checkbox label="SMS" />}
              </form1.AppField>

              <form1.AppField name="notifications.push">
                {(field) => <field.Checkbox label="Push" />}
              </form1.AppField>
            </FieldGroup>
          </FieldSet>

          {/*Dynamic array of objects */}
          <FieldSeparator />
          <form1.Field name="users" mode="array">
            {(field) => {
              return (
                <FieldSet>
                  <div className="flex justify-between gap-2 items-center">
                    <FieldContent>
                      <FieldLegend variant="label" className="mb-0">
                        User Email Addresses
                      </FieldLegend>
                      <FieldDescription>
                        Add up to 5 users to this project (including yourself).
                      </FieldDescription>
                      {field.state.meta.errors && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => field.pushValue({ email: "" })}
                    >
                      Add User
                    </Button>
                  </div>
                  <FieldGroup>
                    {field.state.value.map((user, index) => (
                      <form1.Field
                        key={`${user.email}`}
                        name={`users[${index}].email`}
                      >
                        {(innerField) => {
                          const isInvalid =
                            innerField.state.meta.isTouched &&
                            !innerField.state.meta.isValid;
                          return (
                            <Field
                              orientation="horizontal"
                              data-invalid={isInvalid}
                            >
                              <FieldContent>
                                <InputGroup>
                                  <InputGroupInput
                                    id={innerField.name}
                                    aria-invalid={isInvalid}
                                    aria-label={`User ${index + 1} email`}
                                    type="email"
                                    onBlur={innerField.handleBlur}
                                    onChange={(e) =>
                                      innerField.handleChange(e.target.value)
                                    }
                                    value={innerField.state.value}
                                  />
                                  {field.state.value.length > 1 && (
                                    <InputGroupAddon align="inline-end">
                                      <InputGroupButton
                                        type="button"
                                        variant="ghost"
                                        size="icon-xs"
                                        onClick={() => field.removeValue(index)}
                                        aria-label={`Remove User ${index + 1}`}
                                      >
                                        <XIcon />
                                      </InputGroupButton>
                                    </InputGroupAddon>
                                  )}
                                </InputGroup>
                                {isInvalid && (
                                  <FieldError
                                    errors={innerField.state.meta.errors}
                                  />
                                )}
                              </FieldContent>
                            </Field>
                          );
                        }}
                      </form1.Field>
                    ))}
                  </FieldGroup>
                </FieldSet>
              );
            }}
          </form1.Field>
          <Button type="submit" form="form1">
            Submit
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};
export default TanstackForm1;
