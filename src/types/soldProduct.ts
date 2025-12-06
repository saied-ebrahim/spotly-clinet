import { UserID } from "./order";

export interface SoldProduct {
  _id: string;
  userID: UserID;
  ticketTypeID: string;
  quantity: number;
  discount: number;
  totalAfterDiscount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SoldProductsResponse {
  status: string;
  orders: SoldProduct[];
}
