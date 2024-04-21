import { IonApp, IonButton, IonInput } from "@ionic/react";

import { useEffect, useRef, useState } from "react";
import useLoginUser from "../../hooks/useLoginUser";
import "./LoginPage.css";

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
    <IonApp className="background">
      <div className="Login-box">
        <h1>Login</h1>
        {errorMessage && <h4>{errorMessage}</h4>}
        {isMutating && <h2>Signing in...</h2>}
        <>
          <IonInput
            ref={emailRef}
            label="Email"
            type="email"
            fill="outline"
            labelPlacement="start"
            disabled={isMutating}
          ></IonInput>
          <IonInput
            ref={passwordRef}
            label="Password"
            type="password"
            fill="outline"
            labelPlacement="start"
            disabled={isMutating}
          ></IonInput>
          <IonButton onClick={handleSignin} disabled={isMutating}>
            Sign In
          </IonButton>
        </>
      </div>
    </IonApp>
  );
}

export default Login;
