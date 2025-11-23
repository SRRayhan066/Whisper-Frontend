const TOKEN_KEY = "refreshToken";

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    // Store in localStorage
    localStorage.setItem(TOKEN_KEY, token);

    // Also store in cookie for middleware access
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${
      60 * 60 * 24 * 7
    }; SameSite=Strict`;
  }
};

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    // Also remove from cookie
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
  }
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
