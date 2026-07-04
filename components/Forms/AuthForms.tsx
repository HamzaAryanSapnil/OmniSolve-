"use client";
import { toast } from "sonner";
import { FieldGroup } from "../ui/field";
import { Button } from "../ui/button";
import { useAppForm } from "./hooks";
import type { StandardSchemaV1 } from "@tanstack/react-form";
import Link from "next/link";
import ROUTES from "@/constants/route";

interface AuthFormTypes<T> {
  formType: "Sign_In" | "Sign_Up";
  defaultValues: T;
  schema: StandardSchemaV1<T>;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
}

export default function AuthForms<T extends Record<string, unknown>>({
  formType,
  defaultValues,
  schema,
  onSubmit,
}: AuthFormTypes<T>) {
  const form = useAppForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      toast.success("Form submitted successfully");
    },
  });

  const buttonText = formType === "Sign_In" ? "Sign In" : "Sign Up";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="mt-10 space-y-6"
    >
      {Object.keys(defaultValues).map((key) => {
        return (
          <FieldGroup key={key} className="flex w-full flex-col gap-2.5">
            <form.AppField name={key} key={key}>
              {(field) => (
                <field.Input
                  label={
                    key === "email"
                      ? "Email Address"
                      : key && key.charAt(0).toUpperCase() + key.slice(1)
                  }
                  placeholder={`Enter your ${key} `}
                  type={key === "password" ? "password" : "text"}
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                  labelClassName="paragraph-medium text-dark400_light700"
                />
              )}
            </form.AppField>
          </FieldGroup>
        );
      })}
      <Button
        disabled={form.state.isSubmitting}
        className={
          "primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter text-light-900!"
        }
        type="submit"
      >
        {" "}
        {form.state.isSubmitting
          ? buttonText === "Sign In"
            ? "Signing In..."
            : "Signing Up..."
          : buttonText}{" "}
      </Button>
      {formType === "Sign_Up" ? (
        <p>
          {" "}
          Already have an account?{" "}
          <Link href={ROUTES.SIGNIN} className="paragraph-semibold primary-text-gradient">
            Sign In
          </Link>{" "}
        </p>
      ) : (
        <p>
          {" "}
          Don't have an account?{" "}
          <Link href={ROUTES.SIGNUP} className="paragraph-semibold primary-text-gradient">
            Sign Up
          </Link>{" "}
        </p>
      )}
    </form>
  );
}
