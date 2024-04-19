import { Action, Computed, computed } from "easy-peasy";
import User, { UserRolePermission } from "./user";

export interface UserModel {
  userData: User | null;
  isLoggedIn: Computed<UserModel, boolean>;
  logout: Action<UserModel, boolean>;
  setUserData: Action<UserModel, User>;
  userPermissions: Computed<UserModel, string[] | []>;
}

export default interface StoreModel {
  user: UserModel;
}
