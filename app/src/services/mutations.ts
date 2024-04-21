import useSWRMutation from "swr/mutation";
import { loginUser, logoutUser } from "./api";

export function useLoginUserMutation() {
  return useSWRMutation("/users/login", loginUser);
}

export function useLogoutUserMutation() {
  return useSWRMutation("/users/logout", logoutUser);
}
