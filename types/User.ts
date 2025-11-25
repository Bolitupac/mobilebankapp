export interface User {
  id: string;
  account_number: string;
  name: string;
  email: string;
  password: string;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface TransferResult {
  success: boolean;
  message: string;
  newBalance?: number;
}

export interface LoginResult {
  success: boolean;
  message: string;
  user?: User;
}
