import { ReactNode } from "react";
import { useFieldContext } from "./hooks";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";

export type FormControlProps = {
  label: string;
  description?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  labelChildren?: ReactNode;
  descriptionChildren?: ReactNode;
};

type FormBaseProps = FormControlProps & {
  children: ReactNode;
  horizontal?: boolean;
  controlFirst?: boolean;
};

export function FormBase({
  children,
  label,
  description,
  controlFirst,
  horizontal,
  labelClassName,
  descriptionClassName,
  labelChildren,
  descriptionChildren,
  ...props
}: FormBaseProps) {
  const field = useFieldContext();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const labelElement = (
    <>
      <FieldLabel htmlFor={field.name} className={labelClassName}>
        {label}
        {labelChildren}
      </FieldLabel>
      {description && (
        <FieldDescription className={descriptionClassName}>{description} {descriptionChildren}</FieldDescription>
      )}
    </>
  );
  const errorElem = isInvalid && (
    <FieldError errors={field.state.meta.errors} />
  );

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : undefined}
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {labelElement}
            {errorElem}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent>{labelElement}</FieldContent>
          {children}
          {errorElem}
        </>
      )}
    </Field>
  );
}
