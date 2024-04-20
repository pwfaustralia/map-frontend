import { IonApp, IonButton, IonInput } from "@ionic/react";

import { useStoreActions } from "easy-peasy";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useLoginUser } from "../../services/mutations";
import StoreModel from "../../types/store";
import "./LoginPage.css";

function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const setUserData = useStoreActions<StoreModel>((actions) => actions.user.setUserData);
  const { data: userData, trigger, isMutating, error } = useLoginUser();
  const history = useHistory();

  const handleSignin = () => {
    if (!emailRef.current?.value || !passwordRef.current?.value) return;
    trigger({ email: emailRef.current.value + "", password: passwordRef.current.value + "" });
  };

  useEffect(() => {
    if (userData?.id) {
      setUserData(userData);
      history.replace(userData.default_page);
    }
  }, [userData]);

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
