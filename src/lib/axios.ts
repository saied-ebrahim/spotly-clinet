import axios from "axios";
import Cookies from "js-cookie";
import { decryptData, encryptData } from "@/shared/encryption";
import { getDeviceID } from "@/shared/device";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const cookie = Cookies.get("sub");
    if (cookie) {
      const decrypted = decryptData(cookie) as any;
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
        const response = await axios.post(
          "http://localhost:5000/api/v1/auth/refreshToken",
          {
            deviceID,
          }
        );

        if (response.data?.token) {
          const cookie = Cookies.get("sub");
          const decrypted = cookie ? (decryptData(cookie) as any) : {};

          const newEncryptedData = encryptData({
            ...decrypted,
            token: response.data.token,
          });

          Cookies.set("sub", newEncryptedData, { path: "/" });

          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        Cookies.remove("sub");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
