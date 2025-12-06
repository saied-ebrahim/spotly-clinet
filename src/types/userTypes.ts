export interface UserAddress {
  city: string;
  country: string;
  state: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  role: string;
  phone: string;
  address?: UserAddress;
  createdAt: string;
  updatedAt: string;
}

export interface UserPagination {
  totalPages: number;
  currentPage: number;
  totalUsers: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface UsersResponse {
  status: string;
  results: number;
  pagination: UserPagination;
  data: {
    users: User[];
  };
}
