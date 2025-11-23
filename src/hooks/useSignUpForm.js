import { SignUpFormFields } from "@/lib/form-fields/SignUpFormFields";
import { getValidationRules } from "@/lib/validators/SignUpFormValidators";
import {
  resolveResponse,
  isErrorResponse,
} from "@/lib/wrapper/ResolveResponse";
import { signUpApi } from "@/lib/constants/ApiRoutes";
import { Message } from "@/lib/constants/Message";
import { useForm } from "react-hook-form";
import { useToast } from "@/contexts/ToastContext";

export default function useSignUpForm({ onToggle }) {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      [SignUpFormFields.NAME]: "",
      [SignUpFormFields.EMAIL]: "",
      [SignUpFormFields.PASSWORD]: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await resolveResponse(signUpApi(data));

    if (isErrorResponse(response)) {
      showToast(`${Message.SIGN_UP_FAILED}: ${response.error}`, "error");
      return;
    }

    showToast(Message.SIGN_UP_SUCCESS, "success");
    onToggle();
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
