export interface OrderUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: {
    city?: string;
    country?: string;
    state?: string;
  };
}

export interface OrderDocument {
  _id: string;
  userID: OrderUser;
  ticketTypeID: string;
  quantity: number;
  discount: number;
  totalAfterDiscount: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
