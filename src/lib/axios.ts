import axios from "axios";
import Cookies from "js-cookie";
import { decryptData, encryptData } from "@/shared/encryption";
import { getDeviceID } from "@/shared/device";
import { useLoaderStore } from "@/store/useLoaderStore";
import { authService } from "@/services/authService";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Extend AxiosRequestConfig to include our custom property
declare module "axios" {
  export interface AxiosRequestConfig {
    skipGlobalLoading?: boolean;
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    const cookie = Cookies.get("sub");
    if (cookie) {
      const decrypted = decryptData(cookie) as {
        token?: string;
        deviceID?: string;
      };
      if (decrypted?.token) {
        config.headers.Authorization = `Bearer ${decrypted.token}`;
      }
    }
    if (!config.skipGlobalLoading) {
      if (typeof window !== "undefined") {
        const path = window.location.pathname.toLowerCase();
        if (
          !path.includes("/dashboard") &&
          !path.includes("/admin") &&
          !path.includes("/organizer")
        ) {
          useLoaderStore.getState().startLoading();
        }
      } else {
        useLoaderStore.getState().startLoading();
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    if (!response.config.skipGlobalLoading) {
      if (typeof window !== "undefined") {
        const path = window.location.pathname.toLowerCase();
        if (
          !path.includes("/dashboard") &&
          !path.includes("/admin") &&
          !path.includes("/organizer")
        ) {
          useLoaderStore.getState().stopLoading();
        }
      } else {
        useLoaderStore.getState().stopLoading();
      }
    }
    return response;
  },
  async (error) => {
    if (!error.config?.skipGlobalLoading) {
      if (typeof window !== "undefined") {
        const path = window.location.pathname.toLowerCase();
        if (
          !path.includes("/dashboard") &&
          !path.includes("/admin") &&
          !path.includes("/organizer")
        ) {
          useLoaderStore.getState().stopLoading();
        }
      } else {
        useLoaderStore.getState().stopLoading();
      }
    }
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/logout")
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const deviceID = await getDeviceID();
        const refreshResponse = await authService.refreshToken(deviceID);

        // Handle different response structures based on what authService returns
        const newToken =
          refreshResponse?.token ||
          refreshResponse?.data?.token ||
          refreshResponse?.accessToken;

        if (newToken) {
          const cookie = Cookies.get("sub");
          // If we had a previous cookie, try to preserve other data, otherwise start fresh
          let previousData = {};
          try {
            if (cookie) {
              previousData = decryptData(cookie) as Record<string, unknown>;
            }
          } catch (e) {
            // ignore decryption errors on old cookie
          }

          const newEncryptedData = encryptData({
            ...previousData,
            token: newToken,
            deviceID, // Ensure deviceID is always present
          });

          Cookies.set("sub", newEncryptedData, {
            path: "/",
            secure: false,
            sameSite: "Lax",
          });

          axiosInstance.defaults.headers.common["Authorization"] =
            "Bearer " + newToken;
          processQueue(null, newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        Cookies.remove("sub");

        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
