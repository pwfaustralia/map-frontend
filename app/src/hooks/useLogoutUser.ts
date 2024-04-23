import { useStoreActions } from "easy-peasy";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useLogoutUserMutation } from "../services/mutations";
import StoreModel from "../types/store";
import { useSWRConfig } from "swr";

function useLogoutUser() {
  const { data, trigger, isMutating } = useLogoutUserMutation();
  const logout = useStoreActions<StoreModel>((actions) => actions.user.logout);
  const history = useHistory();
  const { cache } = useSWRConfig();

  const logoutUser = () => {
    trigger();
  };
  useEffect(() => {
    if (data?.success) {
      logout();
      history.replace("/login");
    }
  }, [data]);
  return { logoutUser, isMutating };
}

export default useLogoutUser;
