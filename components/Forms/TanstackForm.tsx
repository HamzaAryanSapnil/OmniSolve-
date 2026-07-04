"use client";

import { toast } from "sonner";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useAppForm } from "./hooks";
import { Button } from "../ui/button";
import { SelectItem } from "../ui/select";

const basicFormSchema = z.object({
  title: z
    .string({ error: "Bug title is required" })
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string({ error: "Description is required" })
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  type: z.enum(["bug", "feature", "question"]),
  types: z.object({
    bug: z.boolean(),
    feature: z.boolean(),
    question: z.boolean(),
  }),
});

type basicFormData = z.infer<typeof basicFormSchema>;

export default function TanstackForm() {
  const form = useAppForm({
    defaultValues: {
      title: "",
      description: "",
      type: "bug",
      types: {
        bug: false,
        feature: false,
        question: false,
      },
    } satisfies basicFormData as basicFormData,
    validators: {
      onSubmit: basicFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      toast.success("Form submitted successfully");
    },
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.AppField name="title">
            {(field) => (
              <field.Input
                label="name"
                description="Please give your name here"
              />
            )}
          </form.AppField>
        </FieldGroup>
        <FieldGroup>
          <form.AppField name="description">
            {(field) => (
              <field.Input
                label="description"
                description="Please give your description here"
              />
            )}
          </form.AppField>
        </FieldGroup>
        <FieldGroup>
          <form.AppField name="type">
            {(field) => (
              <field.Select label="type">
                <SelectItem value="bug">Bug</SelectItem>
                <SelectItem value="feature">Feature</SelectItem>
                <SelectItem value="question">Question</SelectItem>
              </field.Select>
            )}
          </form.AppField>
        </FieldGroup>
        <FieldGroup data-slot="checkbox-group">
          <form.AppField name="types.bug">
            {(field) => <field.Checkbox label="Bug"  />}
          </form.AppField>
          <form.AppField name="types.feature">
            {(field) => <field.Checkbox label="Feature" />}
          </form.AppField>
          <form.AppField name="types.question">
            {(field) => <field.Checkbox label="Question" />}
          </form.AppField>
        </FieldGroup>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}