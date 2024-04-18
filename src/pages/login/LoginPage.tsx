import { IonApp, IonButton, IonCol, IonContent, IonGrid, IonInput, IonRow } from "@ionic/react";
import { useStoreActions } from "easy-peasy";
import StoreModel from "../../lib/easy-peasy/models";

import { Suspense, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useHistory } from "react-router";
import ErrorFallBack from "../../components/ErrorFallBack";
import UserLogin from "../../components/UserLogin";
import "./LoginPage.css";

function Login() {
  const [isLogginIn, setIsLogginIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const login = () => {
    setIsLogginIn(true);
  };

  return (
    <IonApp className="background">
          <div className="Login-box">
            <h1>Login</h1>
            {errorMessage && <h4>{errorMessage}</h4>}
            {!isLogginIn ? (
              <>
                <IonInput ref={emailRef} label="Email" type="email" fill="outline" labelPlacement="start" ></IonInput>
                <IonInput 
                  ref={passwordRef}
                  label="Password"
                  type="password"
                  fill="outline"
                  labelPlacement="start"
                ></IonInput>
                <IonButton className="ion-padding" onClick={login}>Sign In</IonButton>
              </>
            ) : (
              <ErrorBoundary
                fallback={<ErrorFallBack />}
                onError={(error: any) => {
                  if (error.response?.data?.error) {
                    setErrorMessage(error.response.data.error);
                  }
                  setIsLogginIn(false);
                }}
              >
                <Suspense fallback={<h2>Signing in...</h2>}>
                  <UserLogin email={emailRef.current?.value} password={passwordRef.current?.value} />
                </Suspense>
              </ErrorBoundary>
            )}
          </div>
    </IonApp>
  );
}

export default Login;
