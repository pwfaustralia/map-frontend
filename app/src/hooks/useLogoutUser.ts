import { useStoreActions } from "easy-peasy";
import { useLogoutUserMutation } from "../services/mutations";
import StoreModel from "../types/store";

function useLogoutUser() {
  const logout = useStoreActions<StoreModel>((actions) => actions.user.logout);
  const { trigger, isMutating } = useLogoutUserMutation({
    onSuccess: () => {
      logout();
    },
  });

  const logoutUser = () => {
    trigger();
  };
  return { logoutUser, isMutating };
}

export default useLogoutUser;
