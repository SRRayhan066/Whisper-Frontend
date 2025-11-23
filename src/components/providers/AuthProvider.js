"use client";

import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/store/store";
import { setToken, selectAccessToken } from "@/store/slices/authSlice";
import { refreshAccessToken } from "@/lib/utils/tokenRefresh";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!accessToken) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          dispatch(setToken(newToken));
        }
      }
    };

    initializeAuth();
  }, [dispatch, accessToken]);

  return <>{children}</>;
}

export default function AuthProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
