import { HttpStatusCode } from "../constants/HttpStatusCode";
import { Message } from "../constants/Message";
import store from "@/store/store";
import {
  selectAccessToken,
  setToken,
  clearToken,
} from "@/store/slices/authSlice";
import { refreshAccessToken } from "../utils/tokenRefresh";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3007";

export const resolveResponse = async (apiRoute, isRetry = false) => {
  try {
    const { url, method, payload } = apiRoute;

    const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

    const headers = { "Content-Type": "application/json" };

    const state = store.getState();
    const token = selectAccessToken(state);
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
      credentials: "include",
    };

    if (payload && method !== "GET") {
      options.body = JSON.stringify(payload);
    }

    const res = await fetch(fullUrl, options);
    const json = await res.json();

    if (res.status === HttpStatusCode.UNAUTHORIZED && !isRetry) {
      const newToken = await refreshAccessToken();

      if (newToken) {
        store.dispatch(setToken(newToken));
        return resolveResponse(apiRoute, true);
      } else {
        store.dispatch(clearToken());
        return {
          success: false,
          error: "Session expired. Please login again.",
          status: HttpStatusCode.UNAUTHORIZED,
        };
      }
    }

    if (res.ok) {
      return { success: true, data: json.data ?? json, status: res.status };
    } else {
      return {
        success: false,
        error: json.error ?? json.message ?? Message.UNKNOWN_ERROR,
        status: res.status,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || Message.NETWORK_ERROR,
      status: 0,
    };
  }
};

export const isErrorResponse = (response) => {
  return response?.status !== HttpStatusCode.OK;
};
