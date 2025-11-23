const Api = {
  GET: (url, payload = null) => ({ url, method: "GET", payload }),
  POST: (url, payload = null) => ({ url, method: "POST", payload }),
  PUT: (url, payload = null) => ({ url, method: "PUT", payload }),
  PATCH: (url, payload = null) => ({ url, method: "PATCH", payload }),
  DELETE: (url, payload = null) => ({ url, method: "DELETE", payload }),
};

export const signUpApi = (payload) => {
  return Api.POST("/api/auth/sign-up", payload);
};

export const signInApi = (payload) => {
  return Api.POST("/api/auth/sign-in", payload);
};

export const signOutApi = () => {
  return Api.POST("/api/auth/sign-out");
};

export const getNewToken = () => {
  return Api.GET("/api/auth/refresh-token");
};
