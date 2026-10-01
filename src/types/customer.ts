export interface Address {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface Customer {
  id: number;
  date_created: string;
  date_modified: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: Address;
  shipping: Address;
  is_paying_customer: boolean;
  avatar_url?: string;
}

export interface AuthSession {
  token?: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
  customerId?: number;
}
