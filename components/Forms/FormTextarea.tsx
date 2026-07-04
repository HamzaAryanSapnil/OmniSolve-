import { Textarea } from "../ui/textarea";
import { FormBase, FormControlProps } from "./FormBase";
import { useFieldContext } from "./hooks";

export default function FormTextarea(props: FormControlProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <FormBase {...props}>
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
      />
    </FormBase>
  );
}
