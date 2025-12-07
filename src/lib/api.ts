// lib/api.ts
import axiosInstance from "@/lib/axios";

interface ClaimResponse {
  success: boolean;
  message: string;
  ticketId?: string; // Backend should return this on success
}

interface TransferDetails {
  isValid: boolean;
  eventTitle?: string;
  senderName?: string;
  seat?: string;
  message?: string;
}

// 1. PREVIEW: Check if token is valid without claiming it
// You need an endpoint in your Node backend like POST /claim/validate or GET /tickets/transfer/:token
export async function getTransferDetails(token: string): Promise<TransferDetails | null> {
  try {
    // Assuming you create a validation endpoint on your backend
    const { data } = await axiosInstance.get<TransferDetails>(`/claim/validate?token=${token}`);
    return data;
  } catch (error) {
    // If 404 or 400, return null or specific error state
    return null;
  }
}

// 2. ACTION: Actually claim the ticket
export async function claimTicketRequest(token: string) {
  const { data } = await axiosInstance.post<ClaimResponse>("/claim", {
    token: token,
  });
  return data;
}