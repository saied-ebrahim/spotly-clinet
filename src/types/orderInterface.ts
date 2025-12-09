export interface OrderUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender?: string;
  createdAt?: string;
  updatedAt?: string;
  address?: {
    city?: string;
    country?: string;
    state?: string;
  };
}

import { EventDocument } from "./eventInterface";

export interface OrderDocument {
  _id: string;
  userID: OrderUser;
  eventID: EventDocument; // Populated event
  ticketTypeID: string;
  quantity: number;
  discount: number;
  totalAfterDiscount: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
