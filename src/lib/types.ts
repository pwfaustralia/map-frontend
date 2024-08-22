import { ReactNode } from 'react';

export type TableFilterModifier = 'equals' | 'contains' | 'not equals' | 'starts with';

export interface TableFilterContext {
  filters: TableFilter[];
  filter: TableFilter | undefined;
  // TO DO: add type for selectedModifier
  selectedModifier: any;
  setValue: (value: string) => TableFilterContext;
  toggleActive: (isActive: boolean) => TableFilterContext;
  setModifier: (modifier: TableFilterModifier) => TableFilterContext;
}

export interface TableFilterModifierOption {
  modifier: TableFilterModifier;
  appendSearchText?: string | boolean;
  appendQueryBy?: boolean;
  appendFilterBy?: boolean;
  infix?: boolean;
  valueTransformer?: (id: string, value: any) => string;
  modifierInputComponent: (filter: TableFilter, context: TableFilterContext) => ReactNode;
}

export interface TableFilter {
  id: string;
  label: string;
  modifier: TableFilterModifier;
  modifierOptions?: TableFilterModifierOption[];
  active?: boolean;
  hidden?: boolean;
  value?: any;
  formattedValue?: any;
}

export interface TableFilterConfig {
  defaultValue?: TableFilter[];
  modifierOptions: TableFilterModifierOption[];
}

export enum UserRoles {
  CLIENT = 'Client',
  SUPER_ADMIN = 'Super Admin',
  ADMIN = 'Admin',
  Staff = 'Staff',
}

export interface FastLink {
  open: (config: FastLinkConfig & FastLinkOpenInterface, container: string) => void;
  close: () => void;
}

export interface FastLinkConfig {
  fastLinkURL: string;
  accessToken?: string;
  params?: {
    configName?: string;
  };
}

export interface FastLinkOpenInterface {
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
  onEvent?: (data: any) => void;
  onClose?: (data: any) => void;
}

export interface UserRole {
  id: string;
  role_name: string;
  rolePermissions: string[];
}

export default interface Client {
  id: string;
  first_name: string;
  full_name: string;
  last_name: string;
  middle_name?: string;
  preferred_name?: string;
  email: string;
  home_phone?: string;
  work_phone?: string;
  mobile_phone?: string;
  fax?: string;
  user_id: string;
  physical_address_id?: string;
  postal_address_id?: string;
  yodlee_username: string;
  yodlee_status: string;
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
