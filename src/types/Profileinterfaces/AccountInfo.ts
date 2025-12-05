export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  address: {
    city: string;
    country: string;
    state: string;
  };
}
export interface ApiResponse {
  status: string;
  data: {
    user: UserData;
  };
}