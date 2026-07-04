import { ReactNode } from "react";
import { FormBase, FormControlProps } from "./FormBase";
import { useFieldContext } from "./hooks";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function FormSelect({
  children,
  ...props
}: FormControlProps & { children: ReactNode }) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <FormBase {...props}>
      <Select
        onValueChange={(value) => field.handleChange(value ?? "")}
        value={field.state.value}
      >
        <SelectTrigger
          aria-invalid={isInvalid}
          id={field.name}
          onBlur={field.handleBlur}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </FormBase>
  );
}