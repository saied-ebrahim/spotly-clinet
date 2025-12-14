import axiosInstance from "@/lib/axios";
import axios, { AxiosRequestConfig } from "axios";
import { getDeviceID } from "@/shared/device";
import Cookies from "js-cookie";

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
  phone: number;
  address: {
    city: string;
    country: string;
    state: string;
  };
}

export interface SignupResponse {
  status?: string;
  message?: string;
  data?: unknown;
}

export const authService = {
  login: async (
    data: LoginRequest,
    config?: AxiosRequestConfig
  ): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>(
        API_URL,
        data,
        config
      );
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
      Cookies.remove("sub");
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
    const response = await axiosInstance.post(
      "/auth/refreshToken",
      {
        deviceID,
      },
      {
        withCredentials: true,
        skipGlobalLoading: true,
      }
    );
    return response.data;
  },

  forgotPassword: async (email: string) => {
    try {
      const response = await axiosInstance.post("/password/forgot-password", {
        email,
      });
      return response.data;
    } catch (error: unknown) {
      // 1. If it's an Axios error with a response
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        const data = error.response.data as { message?: string } | string; // data might be string or object

        // Prefer the backend's message if available
        let backendMessage = "";
        if (typeof data === "object" && data !== null && data.message) {
          backendMessage = data.message;
        } else if (typeof data === "string") {
          backendMessage = data;
        }

        if (backendMessage) {
          throw new Error(backendMessage);
        }

        // Fallback based on status code
        if (status === 404) {
          throw new Error("User not found");
        }
        if (status === 400) {
          throw new Error("Invalid request");
        }

        throw new Error("An error occurred while processing your request");
      }

      // 2. If it's already an Error object (e.g. network error), rethrow it
      if (error instanceof Error) {
        throw error;
      }

      // 3. Last resort
      throw new Error("An unexpected error occurred");
    }
  },

  changePassword: async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      const response = await axiosInstance.post(
        "/password/change-password",
        data
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data as { message?: string } | string;
        let backendMessage = "";
        if (typeof data === "object" && data !== null && data.message) {
          backendMessage = data.message;
        } else if (typeof data === "string") {
          backendMessage = data;
        }

        if (backendMessage) {
          throw new Error(backendMessage);
        }
        throw new Error("An error occurred while changing password");
      }
      throw error;
    }
  },

  getDeviceID,
};
