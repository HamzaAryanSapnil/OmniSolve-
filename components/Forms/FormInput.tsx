import { Input } from "../ui/input";
import { FormBase, FormControlProps } from "./FormBase";
import { useFieldContext } from "./hooks";

type FormInputProps = FormControlProps & {
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function FormInput(props: FormInputProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <FormBase {...props}>
      <Input
        className={props.className}
        type={props.type}
        id={field.name}
        name={field.name}
        value={field.state.value}
        placeholder={props.placeholder}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        onKeyDown={props.onKeyDown ?? undefined}
      />
    </FormBase>
  );
}
