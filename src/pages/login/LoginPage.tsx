import { IonButton, IonCol, IonGrid, IonInput, IonRow } from "@ionic/react";

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
    <IonGrid style={{ width: "100%", height: "100%" }}>
      <IonRow class="ion-align-items-center" style={{ height: "100%", background: "#F58C1E" }}>
        <IonCol></IonCol>
        <IonCol
          size="12"
          size-sm="4"
          class="ion-justify-content-center"
          style={{
            background: "#ffffff",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              width: "100%",
              display: "flex",
              gap: 20,
              flexDirection: "column",
              background: "#F58C1E",
              paddingInline: 14,
              paddingBottom: 14,
              borderBlockStartWidth: 4,
              borderRadius: 14,
            }}
          >
            <h1>Login Page</h1>
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
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default Login;
