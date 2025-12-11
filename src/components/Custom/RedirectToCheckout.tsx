// Replace the default axios import with your custom instance
// Adjust the import path to match where your library file is located (e.g., '@/lib/axios')

import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { decryptData } from "@/shared/encryption";
import { toast, ToastContainer } from "react-toastify";
import { CheckoutPayload, CheckoutResponse } from "@/types/components/Checkout/checkoutApi";



// 1. Define the shape of your payload

/**
 * Sends a checkout request using the custom axios instance.
 * No 'token' parameter is needed because axiosInstance handles it automatically.
 * * @param payload The data to send
 * @returns The response data on success, or null on failure
 */
export async function performCheckout(
  payload: CheckoutPayload
): Promise<string | null> {
  console.log("performCheckout");
  // Since your axiosInstance baseURL is '/api/v1', we just append the specific endpoint.
  // Resulting URL: /api/v1/checkout/
 // const url = "/checkoaut/";
 const encrypted = Cookies.get("token");
const token = encrypted ? (decryptData(encrypted) as any)?.token : null;
  console.log("payload", payload);
  console.log("token", token);
  if (!token) {
   
    toast.error("Please login first");
    return null
  };
  try {
  
    const { data } = await axiosInstance.post<CheckoutResponse>("/checkout/", {
      eventID: payload.eventID,
      quantity: payload.quantity,
      discount: payload.discount,
    });

    console.log("Checkout successful:", data);

    // Return the data so the calling component can use it (e.g., redirect to success page)
    // useRouter().push(`${data.url as string}`);
    return data.url;
  } catch (error) {
    if (error instanceof AxiosError) {
      // The server returned a status outside the 2xx range (e.g., 400, 401, 500)
      console.error("API Error Status:", error.response?.status);
      console.error("API Error Data:", error.response?.data);
      console.error("API Error Message:", error.message);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Unexpected Error:", error);
    }

    // Return null or re-throw the error depending on how you want to handle it in the UI
    return null;
  }
}
