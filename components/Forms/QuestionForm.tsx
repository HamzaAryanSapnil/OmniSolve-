"use client";
import { toast } from "sonner";
import { FieldGroup } from "../ui/field";
import { Button } from "../ui/button";
import { useAppForm } from "./hooks";
import { AskQuestionSchema } from "@/lib/validation";

export default function QuestionForm() {
  const form = useAppForm({
    defaultValues: {
      title: "",
      content: "",
      tags: [] as string[],
    },
    validators: {
      onSubmit: AskQuestionSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="mt-10 space-y-6"
    >
      <FieldGroup className="flex w-full flex-col gap-2.5">
        <form.AppField name="title">
          {(field) => (
            <field.Input
              label="Question Title"
              description="Be specific and imagine you're asking a question to another person."
              placeholder="Enter your title"
              type="text"
              className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
              labelClassName="paragraph-semibold text-dark400_light800"
              descriptionClassName="body-regular mt-2.5 text-light-500"
              labelChildren={<span className="text-primary-500">*</span>}
            />
          )}
        </form.AppField>
      </FieldGroup>
      <FieldGroup className="flex w-full flex-col gap-2.5">
        <form.AppField name="content">
          {(field) => (
            <field.Input
              label=" Detailed explanation of your problem "
              description="Introduce the problem and expand on what you've put in the
                title."
              placeholder="Enter your content"
              type="text"
              className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
              labelClassName="paragraph-medium text-dark400_light700"
              descriptionClassName="body-regular mt-2.5 text-light-500"
              labelChildren={<span className="text-primary-500">*</span>}
            />
          )}
        </form.AppField>
      </FieldGroup>
      <FieldGroup className="flex w-full flex-col gap-2.5">
        <form.AppField name="tags">
          {(field) => (
            <field.Input
              label="Tags"
              placeholder="Enter your tags"
              type="text"
              className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
              labelClassName="paragraph-medium text-dark400_light700"
              labelChildren={<span className="text-primary-500">*</span>}
              description="Add up to 3 tags to describe what your question is about."
              descriptionClassName="body-regular mt-2.5 text-light-500"
            />
          )}
        </form.AppField>
      </FieldGroup>

      <div className="mt-16 flex justify-end">
        <Button
          type="submit"
          className="primary-gradient w-fit text-light-900!"
        >
          Ask A Question
        </Button>
      </div>
    </form>
  );
}
