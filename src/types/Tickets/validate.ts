export interface TicketValidateResponse {
  success: boolean;
  orderId: string;
  url: string;
  message?: string;
}

export interface TicketValidatePayload {
  ticketToken: string;
  userId: string;
}
