import useSWR from "swr";
import { loginUser } from "../api/usersApi";
import { useHistory } from "react-router";
import { useStoreActions } from "easy-peasy";
import StoreModel from "../lib/easy-peasy/models";

interface UserLoginProps {
  email: any;
  password: any;
}

function UserLogin({ email, password }: UserLoginProps) {
  const { data } = useSWR(["/login", email, password], ([url, email, password]) => loginUser(url, email, password), {
    suspense: true,
  });
  const setUserData = useStoreActions<StoreModel>((actions) => actions.user.setUserData);
  const history = useHistory();

  if (data?.token) {
    setUserData(data);
    history.replace(data.default_page);
  }
  return <></>;
}

export default UserLogin;
