import ax from "axios/index";
import * as SecureStore from "expo-secure-store";

const axios = ax.create({
  baseURL: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api`,
});

axios.interceptors.request.use(
  async (request) => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    // const refreshToken = await SecureStore.getItemAsync("refreshToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken"); // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        const response = await axios.get("/auth/refresh-token", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        // Store the new access and refresh tokens.
        await Promise.all([
          SecureStore.setItemAsync("accessToken", accessToken),
          SecureStore.setItemAsync("refreshToken", newRefreshToken),
        ]);

        // Update the authorization header with the new access token.
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return axios(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);

export default axios;
