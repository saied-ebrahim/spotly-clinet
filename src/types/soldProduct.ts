import { UserID } from "./order";

export interface EventID {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: {
    district: string;
    city: string;
    address: string;
  };
}

export interface SoldProduct {
  _id: string;
  userID: UserID;
  eventID: EventID;
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
