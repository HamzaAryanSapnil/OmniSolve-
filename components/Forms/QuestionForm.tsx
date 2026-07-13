"use client";
import { toast } from "sonner";
import { FieldGroup, FieldError } from "../ui/field";
import { Button } from "../ui/button";
import { useAppForm } from "./hooks";
import { AskQuestionSchema } from "@/lib/validation";
import { useRef, useState } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import TagCard from "../cards/TagCard";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AnyFieldApi } from "@tanstack/react-form";



export default function QuestionForm() {
  const editorRef = useRef<MDXEditorMethods>(null);
  const [tagInput, setTagInput] = useState("");
  console.log(" Is My Component reloading after submit?");

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

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: AnyFieldApi,
  ) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const tagInputValue = tagInput.trim();
    const tags = Array.isArray(field.state.value) ? field.state.value : [];
    if (!tagInputValue) return;
    if (tags.includes(tagInputValue)) return;
    if (tags.length >= 3) {
      field.setErrorMap({
        onChange: [{ message: "Maximum of 3 tags." }],
      });
      return;
    } else {
    field.handleChange([...tags, tagInputValue]);
    setTagInput("");
  }
};

  const handleTagRemove = (tag: string, field: AnyFieldApi) => {
    const tags = Array.isArray(field.state.value) ? field.state.value : [];
    field.handleChange(tags.filter((t: string) => t !== tag));
    field.setErrorMap({ onChange: undefined });
  };

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
            <field.Editor
              label=" Detailed explanation of your problem "
              description="Introduce the problem and expand on what you've put in the
                title."
              placeholder="Enter your content"
              type="text"
              className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
              labelClassName="paragraph-medium text-dark400_light700"
              descriptionClassName="body-regular mt-2.5 text-light-500"
              labelChildren={<span className="text-primary-500">*</span>}
              editorRef={editorRef}
              value={field.state.value}
              fieldChange={(value) => field.handleChange(value)}
            />
          )}
        </form.AppField>
      </FieldGroup>
      <FieldGroup className="flex w-full flex-col gap-2.5">
        <form.AppField
          name="tags"
          validators={{
            onChange: AskQuestionSchema.shape.tags,
          }}
        >
          {(field) => (
            <>
              <Label
                htmlFor="tags-input"
                className="paragraph-medium text-dark400_light700"
              >
                Tags <span className="text-primary-500">*</span>
              </Label>
              <p className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about.
              </p>
              <Input
                type="text"
                placeholder="Enter your tags"
                className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                onKeyDown={(e) => handleInputKeyDown(e, field)}
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                  if (field.state.meta.errors.length > 0) {
                    field.setErrorMap({ onChange: undefined });
                  }
                }}
              />

              {(form.state.submissionAttempts > 0 ||
                field.state.meta.isTouched) &&
                !field.state.meta.isValid && (
                  <FieldError errors={field.state.meta.errors} />
                )}

              {Array.isArray(field.state.value) &&
                field.state.value.length > 0 && (
                  <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                    {field.state.value.map((tag: string) => (
                      <TagCard
                        key={tag}
                        _id={tag}
                        name={tag}
                        compact
                        remove
                        isButton
                        handleRemove={() => handleTagRemove(tag, field)}
                      />
                    ))}
                  </div>
                )}
            </>
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

