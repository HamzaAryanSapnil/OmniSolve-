import Editor, { EditorProps } from "@/components/editor";
import { FormBase, FormControlProps } from "./FormBase";
import { useFieldContext } from "./hooks";

export default function FormEditor(props: FormControlProps & EditorProps) {
  const field = useFieldContext<string>();

  return (
    <FormBase {...props} controlFirst>
      <Editor
        value={field.state.value}
        fieldChange={(value) => field.handleChange(value)}
        editorRef={props.editorRef}
      />
    </FormBase>
  );
}
