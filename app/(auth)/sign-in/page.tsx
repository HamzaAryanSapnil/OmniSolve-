"use client";
import AuthForms from "@/components/Forms/AuthForms";
import { signInSchema } from "@/lib/validation";
import z from "zod";


type SignInFormData = z.infer<typeof signInSchema>;
export default function SignIn() {
  return (
    <AuthForms<SignInFormData>
      formType={"Sign_In"}
      schema={signInSchema}
      defaultValues={{ email: "", password: "" } satisfies SignInFormData as SignInFormData }
      onSubmit={(data) => Promise.resolve({success: true, data})}
    />
  );
}









