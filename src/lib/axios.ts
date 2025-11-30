import axios from "axios";
import Cookies from "js-cookie";
import { decryptData, encryptData } from "@/shared/encryption";
import { getDeviceID } from "@/shared/device";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const cookie = Cookies.get("session_data");
    if (cookie) {
      const decrypted = decryptData(cookie) as {
        token?: string;
        deviceID?: string;
      };
      if (decrypted?.token) {
        config.headers.Authorization = `Bearer ${decrypted.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const deviceID = getDeviceID();
        const cookie = Cookies.get("session_data");
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
          const cookie = Cookies.get("session_data");
          const decrypted = cookie
            ? (decryptData(cookie) as {
                token?: string;
                deviceID?: string;
                user?: any;
              })
            : {};

          const newEncryptedData = encryptData({
            ...decrypted,
            token: response.data.token,
          });

          Cookies.set("session_data", newEncryptedData, { path: "/" });

          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        Cookies.remove("session_data");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
