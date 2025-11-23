"use client";

import { useEffect, useRef, useCallback } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/store/store";
import { setToken, selectAccessToken } from "@/store/slices/authSlice";
import { refreshAccessToken } from "@/lib/utils/tokenRefresh";
import { TOKEN_REFRESH_INTERVAL } from "@/lib/constants/ApplicationConstant";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const refreshTimerRef = useRef(null);

  const performTokenRefresh = useCallback(async () => {
    const newToken = await refreshAccessToken();
    if (newToken) {
      dispatch(setToken(newToken));
    }
  }, [dispatch]);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!accessToken) {
        await performTokenRefresh();
      }
    };

    initializeAuth();
  }, [accessToken, performTokenRefresh]);

  useEffect(() => {
    if (accessToken) {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }

      refreshTimerRef.current = setInterval(() => {
        performTokenRefresh();
      }, TOKEN_REFRESH_INTERVAL);
    } else {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
    }

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, [accessToken, performTokenRefresh]);

  return <>{children}</>;
}

export default function AuthProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
