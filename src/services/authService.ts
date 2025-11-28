import axiosInstance from "@/lib/axios";
import axios from "axios";
import { getDeviceID } from "@/shared/device";

const API_URL = "/auth/login";

export interface LoginRequest {
  email: string;
  password: string;
  deviceID: string;
}

export interface LoginResponse {
  status?: string;
  token?: string;
  data?: unknown;
  message?: string;
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

  refreshToken: async (deviceID: string) => {
    // Use direct axios to avoid interceptor loop/redirects
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/refreshToken",
      {
        deviceID,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  getDeviceID,
};
