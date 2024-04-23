import { useStoreActions } from "easy-peasy";
import { useHistory } from "react-router";
import { useLogoutUserMutation } from "../services/mutations";
import StoreModel from "../types/store";

function useLogoutUser() {
  const logout = useStoreActions<StoreModel>((actions) => actions.user.logout);
  const history = useHistory();
  const { trigger, isMutating } = useLogoutUserMutation({
    onSuccess: () => {
      logout();
      history.go(0);
    },
  });

  const logoutUser = () => {
    trigger();
  };
  return { logoutUser, isMutating };
}

export default useLogoutUser;
