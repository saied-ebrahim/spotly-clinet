export interface CheckoutPayload {
    eventID:string,
    quantity:number,
    discount:number
}

// 2. Define the response shape
export interface CheckoutResponse {
  success: boolean;
  orderId: string;
  url: string;
  message?: string;
}
