"use client";

import InputField from "@/components/ui/input/InputField";
import Button from "@/components/ui/button/Button";
import useSignInForm from "@/hooks/useSignInForm";
import { SignInFormFields } from "@/lib/form-fields/SignInFormFields";

export default function SignInForm({ onToggle = () => {} }) {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    getValidationRules,
  } = useSignInForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl flex flex-col items-center gap-3 p-6 bg-neutral-900 rounded-lg shadow-md"
    >
      <h1 className="text-3xl font-bold text-slate-200 mb-2">Sign In</h1>
      <p className="text-slate-400 mb-6 text-center">
        Sign in to your account to continue.
      </p>

      <InputField
        placeholder="Email"
        type="email"
        error={errors[SignInFormFields.EMAIL]}
        {...register(
          SignInFormFields.EMAIL,
          getValidationRules(SignInFormFields.EMAIL)
        )}
      />

      <InputField
        placeholder="Password"
        type="password"
        error={errors[SignInFormFields.PASSWORD]}
        {...register(
          SignInFormFields.PASSWORD,
          getValidationRules(SignInFormFields.PASSWORD)
        )}
      />

      <Button
        className={"w-32"}
        type="submit"
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
      >
        Sign In
      </Button>

      <p>
        Don&apos;t have an account?{" "}
        <span className="font-bold cursor-pointer" onClick={onToggle}>
          Register
        </span>
      </p>
    </form>
  );
}
