import { useStoreActions } from "easy-peasy";
import { useLogoutUserMutation } from "../services/mutations";
import StoreModel from "../types/store";
import { useHistory } from "react-router";

function useLogoutUser() {
  const logout = useStoreActions<StoreModel>((actions) => actions.user.logout);
  const history = useHistory();
  const { trigger, isMutating } = useLogoutUserMutation({
    onSuccess: () => {
      logout();
      setTimeout(() => {
        history.go(0);
      }, 50);
    },
  });

  const logoutUser = () => {
    trigger();
  };
  return { logoutUser, isMutating };
}

export default useLogoutUser;
