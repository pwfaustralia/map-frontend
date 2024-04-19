export interface UserRolePermission {
  scope: string;
  scopeName: string;
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
