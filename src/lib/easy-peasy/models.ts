import { Action, Computed, computed } from "easy-peasy";

interface UserRolePermission {
  scope: string;
  scopeName: string;
}

interface UserRole {
  name: string;
  role_permissions: UserRolePermission[];
}

interface User {
  name: string;
  email: string;
  token: string;
  user_role: UserRole;
}

export interface UserModel {
  userData: User | null;
  isLoggedIn: Computed<UserModel, boolean>;
  logout: Action<UserModel, boolean>;
  setUserData: Action<UserModel, User>;
  userPermissions: Computed<UserModel, UserRolePermission[] | []>;
}

export default interface StoreModel {
  user: UserModel;
}
