import useSWR from "swr";
import { loginUser } from "../api/usersApi";

interface UserLoginProps {
  email: any;
  password: any;
}

function UserLogin({ email, password }: UserLoginProps) {
  const { data } = useSWR(
    ["/users/login", email, password],
    ([url, email, password]) => loginUser(url, email, password),
    {
      suspense: true,
    }
  );
  if (data?.id) {
    return (
      <>
        <h5>Welcome back {data.name}! You will be redirected to the app shortly, please wait.</h5>
      </>
    );
  }
  return <></>;
}

export default UserLogin;
