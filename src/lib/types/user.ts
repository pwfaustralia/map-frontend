import { AccountFilter } from './yodlee';

export enum UserRoles {
  CLIENT = 'Client',
  SUPER_ADMIN = 'Super Admin',
  ADMIN = 'Admin',
  Staff = 'Staff',
}

export interface UserRole {
  id: string;
  role_name: string;
  rolePermissions: string[];
}

export type Account = {
  id: string;
  container: AccountFilter['container'];
  is_primary: number;
  account_id: number;
  client_id: string;
  original_loan_amount: {
    amount: string;
    currency: string;
  };
};

export default interface Client {
  id: string;
  first_name: string;
  full_name: string;
  last_name: string;
  middle_name?: string;
  preferred_name?: string;
  email: string;
  accounts_count: number;
  transactions_count: number;
  home_phone?: string;
  work_phone?: string;
  mobile_phone?: string;
  fax?: string;
  user_id: string;
  address_1?: string;
  address_2?: string;
  postcode?: string;
  city?: string;
  state?: string;
  country?: string;
  yodlee_username: string;
  yodlee_status: 'IMPORT_SUCCESS' | 'IMPORT_FAILED' | 'IMPORTING';
  primary_account: Account | null;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  user_role: UserRole;
  default_page: string;
  email_verified_at: string;
  user_role_id: number;
  created_at: string;
  updated_at: string;
  clients: Client[];
}

export interface LoanData {
  scenario: string;
  year: number;
  balance: number;
  deposit: number;
  offset_amount: number | null;
  credit_card_amount: number | null;
  offset_balance: number | null;
}
