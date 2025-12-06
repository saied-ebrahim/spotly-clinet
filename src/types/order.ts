export interface Address {
  city: string;
  country: string;
  state: string;
}

export interface UserID {
  address: Address;
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
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

export interface OrderResponse {
  status: string;
  data: {
    order: Order[];
  };
}
