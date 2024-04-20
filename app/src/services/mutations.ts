import useSWRMutation from "swr/mutation";
import { loginUser, logoutUser } from "./api";

export function useLoginUser() {
  return useSWRMutation("/users/login", loginUser);
}

export function useLogoutUser() {
  return useSWRMutation("/users/logout", logoutUser);
}
