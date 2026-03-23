import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { Input } from "@/ui/input";
import { Textarea } from "../ui/textarea";
import type { FormControlProps } from "./TanstackFormBase";
import TanstackFormBase from "./TanstackFormBase";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const FormTextField = (props: FormControlProps) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <TanstackFormBase {...props}>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />
    </TanstackFormBase>
  );
};

const FormTextarea = (props: FormControlProps) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <TanstackFormBase {...props}>
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />
    </TanstackFormBase>
  );
};

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField: FormTextField,
    Textarea: FormTextarea,
    //Select: FormSelect,
    // Checkbox: FormCheckbox,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
