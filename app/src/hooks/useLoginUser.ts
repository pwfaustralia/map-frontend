import { useStoreActions } from "easy-peasy";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useLoginUserMutation } from "../services/mutations";
import StoreModel from "../types/store";

function useLoginUser() {
  const { data: userData, trigger, isMutating, error } = useLoginUserMutation();
  const setUserData = useStoreActions<StoreModel>((actions) => actions.user.setUserData);
  const history = useHistory();

  const loginUser = (email: string, password: string) => {
    trigger({ email, password });
  };
  useEffect(() => {
    if (userData?.id) {
      setUserData(userData);
      history.replace(userData.default_page);
    }
  }, [userData]);
  return { loginUser, isMutating, error };
}

export default useLoginUser;
