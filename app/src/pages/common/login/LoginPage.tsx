import { lockClosed, mail } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import Button from "../../../components/atoms/button/Button";
import Input from "../../../components/atoms/input/Input";
import LoginTemplate from "../../../components/templates/login/default/LoginTemplate";
import useLoginUser from "../../../hooks/useLoginUser";
import "./LoginPage.css";
import Text from "../../../components/atoms/text/Text";

function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const { loginUser, isMutating, error } = useLoginUser();

  const handleSignin = () => {
    setErrorMessage(null);
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      setErrorMessage("Invalid email/password.");
      return;
    }
    loginUser(emailRef.current.value + "", passwordRef.current.value + "");
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error?.response?.data?.error || "No response from server");
    }
  }, [error]);

  return (
    <LoginTemplate>
      {errorMessage && <h4>{errorMessage}</h4>}
      {isMutating && <h2>Signing in...</h2>}
      <section className="login-page">
        <div className="login__form">
          <Input
            innerRef={emailRef}
            type="email"
            fill="outline"
            value="hello@pwf.com.au"
            disabled={isMutating}
            placeholder="Enter your email"
            icon={mail}
          ></Input>
          <Input
            innerRef={passwordRef}
            type="password"
            value="LK^3gxs8!!8&hu"
            fill="outline"
            disabled={isMutating}
            placeholder="Enter your password"
            icon={lockClosed}
          ></Input>
          <Button onClick={handleSignin} disabled={isMutating} color="primary">
            Sign In
          </Button>
          <Text className="login__forgot_password">
            Forgot your password? <Text color="secondary">Reset Password</Text>
          </Text>
        </div>
      </section>
    </LoginTemplate>
  );
}

export default Login;
