import { useStoreActions } from "easy-peasy";
import { useEffect } from "react";
import { useHistory } from "react-router";
import StoreModel from "../types/store";
import useControlledSWR from "./useControlledSWR";
import { logoutUser as logoutUserAPI } from "../services/api";

function useLogoutUser() {
  const { data, start, isLoading } = useControlledSWR("logout", logoutUserAPI);
  const logout = useStoreActions<StoreModel>((actions) => actions.user.logout);
  const history = useHistory();

  const logoutUser = () => {
    start();
  };
  useEffect(() => {
    if (data?.success) {
      logout();
      history.replace("/login");
    }
  }, [data]);
  return { logoutUser, isLoading };
}

export default useLogoutUser;
