import {
  resolveResponse,
  isErrorResponse,
} from "@/lib/wrapper/ResolveResponse";
import { signOutApi } from "@/lib/constants/ApiRoutes";
import { Message } from "@/lib/constants/Message";
import { ToastType } from "@/lib/enum/ToastType";
import { AppRoute } from "@/lib/constants/AppRoute";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearToken } from "@/store/slices/authSlice";
import { useToast } from "@/contexts/ToastContext";

export default function useChatSection() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);

    const response = await resolveResponse(signOutApi());

    if (isErrorResponse(response)) {
      showToast(
        `${Message.SIGN_OUT_FAILED}: ${response.error}`,
        ToastType.ERROR
      );
      setIsLoggingOut(false);
      return;
    }

    dispatch(clearToken());

    showToast(Message.SIGN_OUT_SUCCESS, ToastType.SUCCESS);

    router.push(AppRoute.ROOT);
  };

  return {
    handleSignOut,
    isLoggingOut,
  };
}
