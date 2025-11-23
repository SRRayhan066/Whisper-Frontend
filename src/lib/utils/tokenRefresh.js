import { getNewToken } from "@/lib/constants/ApiRoutes";
import {
  resolveResponse,
  isErrorResponse,
} from "@/lib/wrapper/ResolveResponse";

export const refreshAccessToken = async () => {
  try {
    const response = await resolveResponse(getNewToken());

    if (isErrorResponse(response)) {
      return null;
    }

    return response.data?.accessToken || null;
  } catch (error) {
    return null;
  }
};
