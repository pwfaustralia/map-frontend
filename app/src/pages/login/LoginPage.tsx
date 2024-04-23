import { lockClosed, mail } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/atoms/button/Button";
import Input from "../../components/atoms/input/Input";
import useLoginUser from "../../hooks/useLoginUser";
import "./LoginPage.css";
import { IonText } from "@ionic/react";

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
    <>
      {errorMessage && <h4>{errorMessage}</h4>}
      {isMutating && <h2>Signing in...</h2>}
      <section className="login-page">
        <div className="login__form">
          <Input
            innerRef={emailRef}
            type="email"
            fill="outline"
            disabled={isMutating}
            placeholder="Enter your email"
            icon={mail}
          ></Input>
          <Input
            innerRef={passwordRef}
            type="password"
            fill="outline"
            disabled={isMutating}
            placeholder="Enter your password"
            icon={lockClosed}
          ></Input>
          <Button onClick={handleSignin} disabled={isMutating} color="primary">
            Sign In
          </Button>
          <IonText className="login__forgot_password">
            Forgot your password? <IonText color="secondary">Reset Password</IonText>
          </IonText>
        </div>
      </section>
    </>
  );
}

export default Login;
