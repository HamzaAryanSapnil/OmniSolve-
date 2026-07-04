import { Checkbox } from "../ui/checkbox";
import { FormBase, FormControlProps } from "./FormBase";
import { useFieldContext } from "./hooks";

export default function FormCheckbox(props: FormControlProps) {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props} controlFirst horizontal>
      <Checkbox
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onCheckedChange={(e) => field.handleChange(e)}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
      />
    </FormBase>
  );
}
