export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  verified: boolean;
  role: string;
  password?: string;        
  refresh_token?: string;   
}


export type UpdateUserPayload = Partial<
  Pick<User, 'first_name' | 'last_name' | 'email' | 'phone_number'>
>;
