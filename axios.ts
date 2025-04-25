import ax from "axios/index";
import * as SecureStore from "expo-secure-store";

const axios = ax.create({
  baseURL: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api`,
});

// --- 🔐 Shared state --------------------------------------------------------
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null; // resolves to new access token
const subscribers: ((token: string) => void)[] = [];

// Add a helper to add pending requests to the queue
function subscribeTokenRefresh(cb: (token: string) => void) {
  subscribers.push(cb);
}

// Fire all queued requests once we have a token
function onRefreshed(token: string) {
  subscribers.forEach((cb) => cb(token));
  subscribers.length = 0;
}

// --- 📩 Request interceptor -------------------------------------------------
axios.interceptors.request.use(async (request) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  if (accessToken) request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

// --- 📪 Response interceptor ------------------------------------------------
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 👉 Bail if it’s not a 401 or if we’ve retried already
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    // 👉 Kick off (or await) a single refresh flow
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = (async () => {
        try {
          const refreshToken = await SecureStore.getItemAsync("refreshToken");
          console.log(
            new Date().toLocaleDateString(),
            "call failed, expired access token, sending refresh token:",
            refreshToken
          );
          const res = await ax.get(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/auth/refresh-token`,
            { headers: { Authorization: `Bearer ${refreshToken}` } }
          );
          console.log(
            new Date().toLocaleDateString(),
            "refresh token response",
            res.data
          );
          const { accessToken, refreshToken: newRefresh } = res.data.data;
          await Promise.all([
            SecureStore.setItemAsync("accessToken", accessToken),
            SecureStore.setItemAsync("refreshToken", newRefresh),
          ]);
          return accessToken; // resolved value of refreshPromise
        } finally {
          isRefreshing = false; // success **or** failure → gate re-opens
        }
      })();
    }

    // 👉 Any request that hits here waits for refreshPromise
    return new Promise((resolve, reject) => {
      subscribeTokenRefresh((token) => {
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        resolve(axios(originalRequest)); // replay with the new token
      });

      // If the refresh itself fails, propagate the error to everyone
      refreshPromise!
        .catch(async (refreshErr) => {
          await Promise.all([
            SecureStore.deleteItemAsync("accessToken"),
            SecureStore.deleteItemAsync("refreshToken"),
          ]);
          reject(refreshErr);
        })
        .then((token) => {
          if (token) onRefreshed(token);
        });
    });
  }
);
export default axios;
