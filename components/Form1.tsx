"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
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
import {
  FormControllerInput,
  FormControllerSelect,
  FormControllerTextArea,
} from "./FormController";

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
      notifications: {
        email: false,
        sms: false,
        push: false,
      },
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
          <FormControllerInput
            control={form1.control}
            name="name"
            label="Name"
          />

          {/*add Controller with different name and FieldLable */}
          <FormControllerSelect
            control={form1.control}
            name="status"
            label="Status"
          >
            {PROJECT_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </FormControllerSelect>

          <FormControllerTextArea
            name="description"
            control={form1.control}
            label="Description"
            description="Be as detailed as possible"
          />

          {/*1754 */}
          <FieldSet>
            <FieldContent>
              <FieldLegend>Notifications</FieldLegend>
              <FieldDescription>
                Select how you would like to receive notifications.
              </FieldDescription>
            </FieldContent>
            <FieldGroup data-slot="checkbox-group">
              <Controller
                name="notifications.email"
                control={form1.control}
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <Checkbox
                      {...field}
                      id={field.name}
                      onCheckedChange={onChange}
                      checked={value}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name} className="font-normal">
                        Email
                      </FieldLabel>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="notifications.sms"
                control={form1.control}
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <Checkbox
                      {...field}
                      id={field.name}
                      onCheckedChange={onChange}
                      checked={value}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name} className="font-normal">
                        SMS
                      </FieldLabel>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="notifications.push"
                control={form1.control}
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <Checkbox
                      {...field}
                      id={field.name}
                      onCheckedChange={onChange}
                      checked={value}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name} className="font-normal">
                        App Notification
                      </FieldLabel>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          {/*2300 dynamic array of objects 
          FieldLegend variant="label" ... for size
          */}
          <FieldSeparator />
          <FieldSet>
            <div className="flex justify-between gap-2 items-center">
              <FieldContent>
                <FieldLegend variant="label" className="mb-0">
                  User Email Addresses
                </FieldLegend>
                <FieldDescription>
                  Add up to 5 users to this project (including yourself).
                </FieldDescription>
                {form1.formState.errors.users?.root && (
                  <FieldError errors={[form1.formState.errors.users.root]} />
                )}
              </FieldContent>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addUser({ email: "" })}
              >
                Add User
              </Button>
            </div>
            <FieldGroup>
              {users.map((user, index) => (
                <Controller
                  key={user.id}
                  name={`users.${index}.email`}
                  control={form1.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            {...field}
                            id={`${field.name}-${index}`}
                            aria-invalid={fieldState.invalid}
                            aria-label={`User ${index + 1} email`}
                            type="email"
                          />
                          {users.length > 1 && (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => removeUser(index)}
                                aria-label={`Remove User ${index + 1}`}
                              >
                                <XIcon />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>
          </FieldSet>

          <Button type="submit" form="form1">
            Submit
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
