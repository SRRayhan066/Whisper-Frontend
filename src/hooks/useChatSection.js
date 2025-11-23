import {
  resolveResponse,
  isErrorResponse,
} from "@/lib/wrapper/ResolveResponse";
import { signOutApi } from "@/lib/constants/ApiRoutes";
import { Message } from "@/lib/constants/Message";
import { removeAuthToken } from "@/lib/utils/auth";
import { AppRoute } from "@/lib/constants/AppRoute";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useChatSection() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);

    const response = await resolveResponse(signOutApi());

    if (isErrorResponse(response)) {
      alert(`${Message.SIGN_OUT_FAILED}: ${response.error}`);
      console.error("Sign out error:", response.error);
      setIsLoggingOut(false);
      return;
    }

    // Remove the auth token
    removeAuthToken();

    alert(Message.SIGN_OUT_SUCCESS);
    console.log("Sign out success:", response.data);

    // Redirect to home page
    router.push(AppRoute.ROOT);
  };

  return {
    handleSignOut,
    isLoggingOut,
  };
}
