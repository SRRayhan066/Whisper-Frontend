import { HttpStatusCode } from "../constants/HttpStatusCode";
import { Message } from "../constants/Message";
import { getAuthToken } from "../utils/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3007";

export const resolveResponse = async (apiRoute) => {
  try {
    const { url, method, payload } = apiRoute;

    const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

    const headers = { "Content-Type": "application/json" };

    // Add auth token if available
    const token = getAuthToken();
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
