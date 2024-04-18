import { IonApp, IonButton, IonInput } from "@ionic/react";

import { useStoreActions } from "easy-peasy";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import useControlledSWR from "../../hooks/useControlledSWR";
import { loginUser } from "../../services/api";
import StoreModel from "../../types/store";
import "./LoginPage.css";

function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const setUserData = useStoreActions<StoreModel>((actions) => actions.user.setUserData);
  const {
    data: userData,
    start: handleSignin,
    error,
    isLoading,
    pause: stopSignin,
  } = useControlledSWR(["/users/login", emailRef.current?.value, passwordRef.current?.value], loginUser);
  const history = useHistory();

  useEffect(() => {
    if (userData?.id) {
      setUserData(userData);
      history.replace(userData.default_page);
    }
  }, [userData]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error?.response?.data?.error || "No response from server");
      stopSignin();
    }
  }, [error]);

  return (
    <IonApp className="background">
      <div className="Login-box">
        <h1>Login</h1>
        {errorMessage && <h4>{errorMessage}</h4>}
        {isLoading && <h2>Signing in...</h2>}
        <>
          <IonInput
            ref={emailRef}
            label="Email"
            type="email"
            fill="outline"
            labelPlacement="start"
            disabled={isLoading}
          ></IonInput>
          <IonInput
            ref={passwordRef}
            label="Password"
            type="password"
            fill="outline"
            labelPlacement="start"
            disabled={isLoading}
          ></IonInput>
          <IonButton onClick={handleSignin} disabled={isLoading}>
            Sign In
          </IonButton>
        </>
      </div>
    </IonApp>
  );
}

export default Login;
