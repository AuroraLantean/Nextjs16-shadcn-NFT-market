import type { ReactNode } from "react";
//import { useFieldContext } from "./hooks"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Checkbox } from "@/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/ui/field";
import { Input } from "@/ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/ui/select";
import { Textarea } from "@/ui/textarea";

///usage: <FormController control={form1.control} name="name" label="label" />
type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName; //TName will infer only valid name for our app
  label: ReactNode;
  description?: ReactNode;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"]; //write ControllerProps here and import it from react-hook-form. copy the generic types from ControllerProps popover hint, paste them into this FormControlProps<...>, and paste the leading generics here ControllerProps<...>
};
type FormControlFunc<
  ExtraProps extends Record<string, unknown> = Record<never, never>,
> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues> & ExtraProps,
) => ReactNode;

type FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
    >[0]["field"] & {
      "aria-invalid": boolean;
      id: string;
    },
  ) => ReactNode;
  //horizontal?: boolean
  //controlFirst?: boolean
};
export const FormBase = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  control,
  label,
  name,
  description,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
          </FieldContent>
          {children({
            ...field,
            id: field.name,
            "aria-invalid": fieldState.invalid,
          })}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

//adding generics from above should give hint on name argument... but not working
/*const FormController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues>,
) => {
  return <FormBase {...props}>{(field) => <Input {...field} />}</FormBase>;
};

export default FormController;*/
export const FormControllerInput: FormControlFunc = (props) => {
  return <FormBase {...props}>{(field) => <Input {...field} />}</FormBase>;
};
export const FormControllerTextArea: FormControlFunc = (props) => {
  return <FormBase {...props}>{(field) => <Textarea {...field} />}</FormBase>;
};

//4236 for FormSelect
export const FormControllerSelect: FormControlFunc<{
  children: ReactNode;
}> = ({ children, ...props }) => {
  //const field = useFieldContext<string>();
  //const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      {({ onChange, onBlur, ...field }) => (
        <Select {...field} onValueChange={onChange}>
          <SelectTrigger
            aria-invalid={field["aria-invalid"]}
            id={field.name}
            onBlur={onBlur}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
      )}
    </FormBase>
  );
};

export const FormCheckbox: FormControlFunc<{
  children: ReactNode;
}> = (props) => {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Checkbox {...field} checked={value} onCheckedChange={onChange} />
      )}
    </FormBase>
  );
};
