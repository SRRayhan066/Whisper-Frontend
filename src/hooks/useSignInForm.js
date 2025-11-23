import { SignInFormFields } from "@/lib/form-fields/SignInFormFields";
import { getValidationRules } from "@/lib/validators/SignInFormValidators";
import {
  resolveResponse,
  isErrorResponse,
} from "@/lib/wrapper/ResolveResponse";
import { signInApi } from "@/lib/constants/ApiRoutes";
import { Message } from "@/lib/constants/Message";
import { setAuthToken } from "@/lib/utils/auth";
import { AppRoute } from "@/lib/constants/AppRoute";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function useSignInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      [SignInFormFields.EMAIL]: "",
      [SignInFormFields.PASSWORD]: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await resolveResponse(signInApi(data));

    if (isErrorResponse(response)) {
      alert(`${Message.SIGN_IN_FAILED}: ${response.error}`);
      console.error("Sign in error:", response.error);
      return;
    }

    if (response.data?.token) {
      setAuthToken(response.data.token);
    }

    alert(Message.SIGN_IN_SUCCESS);
    console.log("Sign in success:", response.data);

    router.push(AppRoute.CHAT);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    isValid,
    getValidationRules,
  };
}
