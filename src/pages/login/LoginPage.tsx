import { IonButton, IonCol, IonGrid, IonInput, IonRow } from "@ionic/react";
import { useStoreState } from "easy-peasy";
import StoreModel from "../../lib/easy-peasy/models";

import { Suspense, useEffect, useRef, useState } from "react";
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
  const userData = useStoreState<StoreModel>((states) => states.user.userData);
  const history = useHistory();

  const login = () => {
    setIsLogginIn(true);
  };

  useEffect(() => {
    if (userData?.default_page) {
      history.replace(userData.default_page);
    }
  }, [userData]);

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
            {!isLogginIn ? (
              <>
                <IonInput ref={emailRef} label="Email" type="email" fill="outline" labelPlacement="start"></IonInput>
                <IonInput
                  ref={passwordRef}
                  label="Password"
                  type="password"
                  fill="outline"
                  labelPlacement="start"
                ></IonInput>
                <IonButton onClick={login}>Sign In</IonButton>
              </>
            ) : (
              !userData && (
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
              )
            )}
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default Login;
