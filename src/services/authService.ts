import axiosInstance from "@/lib/axios";
import axios from "axios";
import { getDeviceID } from "@/shared/device";
import Cookies from "js-cookie";
import { decryptData } from "@/shared/encryption";

const API_URL = "/auth/login";
const SIGNUP_URL = "/auth/signup";

export interface LoginRequest {
  email: string;
  password: string;
  deviceID: string;
}

export interface LoginResponse {
  status?: string;
  token?: string;
  data?: {
    token?: string;
    accessToken?: string;
  };
  message?: string;
  accessToken?: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender?: string;
  address: {
    city: string;
    country: string;
    state: string;
  };
  devices: {
    deviceFingerprint: string;
  }[];
}

export interface SignupResponse {
  status?: string;
  message?: string;
  data?: unknown;
}

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>(API_URL, data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as LoginResponse;
      }
      throw error;
    }
  },

  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    try {
      const response = await axiosInstance.post<SignupResponse>(
        SIGNUP_URL,
        data
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as SignupResponse;
      }
      throw error;
    }
  },

  logout: async (deviceID: string) => {
    try {
      await axiosInstance.post("/auth/logout", { deviceID });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Token expired or invalid, just ignore
        return;
      }
      console.error("Logout failed", error);
    }
  },

  refreshToken: async (deviceID: string) => {
    // Use direct axios to avoid interceptor loop/redirects
    const cookie = Cookies.get("token");
    let token = "";
    if (cookie) {
      try {
        const decrypted = decryptData(cookie) as { token?: string };
        token = decrypted?.token || "";
      } catch (e) {
        console.error("Failed to decrypt token for refresh", e);
      }
    }

    const response = await axios.post(
      "/api/v1/auth/refreshToken",
      {
        deviceID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  getDeviceID,
};
