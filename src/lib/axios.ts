import axios from "axios";
import Cookies from "js-cookie";
import { decryptData, encryptData } from "@/shared/encryption";
import { getDeviceID } from "@/shared/device";
import { useLoaderStore } from "@/store/useLoaderStore";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Extend AxiosRequestConfig to include our custom property
declare module "axios" {
  export interface AxiosRequestConfig {
    skipGlobalLoading?: boolean;
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    const cookie = Cookies.get("token");
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
          !path.includes("/dashboardhome") &&
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

axiosInstance.interceptors.response.use(
  (response) => {
    if (!response.config.skipGlobalLoading) {
      if (typeof window !== "undefined") {
        const path = window.location.pathname.toLowerCase();
        if (
          !path.includes("/dashboardhome") &&
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
          !path.includes("/dashboardhome") &&
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
      originalRequest._retry = true;

      try {
        const deviceID = await getDeviceID();
        const cookie = Cookies.get("token");
        let token = "";
        if (cookie) {
          const decrypted = cookie
            ? (decryptData(cookie) as { token?: string })
            : {};
          token = decrypted?.token || "";
        }

        const response = await axios.post(
          "/api/v1/auth/refreshToken",
          {
            deviceID,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data?.token) {
          const cookie = Cookies.get("token");
          const decrypted = cookie
            ? (decryptData(cookie) as {
                token?: string;
                deviceID?: string;
                user?: unknown;
              })
            : {};

          const newEncryptedData = encryptData({
            ...decrypted,
            token: response.data.token,
          });

          Cookies.set("token", newEncryptedData, { path: "/" });

          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        Cookies.remove("token");
        // window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
