"use client";
import AuthForms from "@/components/Forms/AuthForms";
import z from "zod";
import { signUpSchema } from "@/lib/validation";

type SignUpFormData = z.infer<typeof signUpSchema>;
export default function SignUp() {
  return (
    <AuthForms<SignUpFormData>
      formType={"Sign_Up"} 
      schema={signUpSchema}
      defaultValues={
        {
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        } satisfies SignUpFormData as SignUpFormData
      }
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
}
