import useSWR from "swr";
import User from "../types/user";
import { loginUser } from "./api";

export function useLoginUser(email: string, password: string, isLogginIn: boolean) {
  return useSWR<User>([isLogginIn ? `/users/login` : null, email, password], loginUser, {});
}
