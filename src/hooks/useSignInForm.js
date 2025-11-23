import { SignInFormFields } from "@/lib/form-fields/SignInFormFields";
import { getValidationRules } from "@/lib/validators/SignInFormValidators";
import {
  resolveResponse,
  isErrorResponse,
} from "@/lib/wrapper/ResolveResponse";
import { signInApi } from "@/lib/constants/ApiRoutes";
import { Message } from "@/lib/constants/Message";
import { ToastType } from "@/lib/enum/ToastType";
import { AppRoute } from "@/lib/constants/AppRoute";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/slices/authSlice";
import { useToast } from "@/contexts/ToastContext";

export default function useSignInForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { showToast } = useToast();
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
      showToast(
        `${Message.SIGN_IN_FAILED}: ${response.error}`,
        ToastType.ERROR
      );
      return;
    }

    if (response.data?.accessToken) {
      dispatch(setToken(response.data.accessToken));
    }

    showToast(Message.SIGN_IN_SUCCESS, ToastType.SUCCESS);

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
