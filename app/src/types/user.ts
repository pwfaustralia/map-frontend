export interface UserRolePermission {
  scope: string;
  scope_name: string;
}

export interface UserRole {
  name: string;
  role_permissions: UserRolePermission[];
}

export default interface User {
  id: string;
  name: string;
  email: string;
  user_role: UserRole;
  default_page: string;
}
