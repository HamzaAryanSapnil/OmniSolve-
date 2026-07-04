import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    TextArea: FormTextarea,
    Select: FormSelect,
    Checkbox: FormCheckbox,
  },
  formComponents: {},
  formContext,
  fieldContext,
});

export { useAppForm, useFieldContext, useFormContext };
