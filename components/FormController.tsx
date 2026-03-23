import type { ReactNode } from "react";
//import { FormBase, FormControlProps } from "./FormBase"
//import { useFieldContext } from "./hooks"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";

///usage: <FormController control={form1.control} name="name" label="label" />
type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName; //TName will infer only valid name for our app
  label: ReactNode;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"]; //write ControllerProps here and import it from react-hook-form. copy the generic types from ControllerProps popover hint, paste them into this FormControlProps<...>, and paste the leading generics here ControllerProps<...>
};
const FormController = ({ control, name, label }: FormControlProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormController;
