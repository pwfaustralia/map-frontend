import { IonButton, IonCol, IonGrid, IonInput, IonRow } from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import StoreModel from "../../lib/easy-peasy/models";

import { useRef } from "react";
import { useHistory } from "react-router";
import "./LoginPage.css";

function Login() {
  const setUserData = useStoreActions<StoreModel>((actions) => actions.user.setUserData);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const history = useHistory();

  const fakeLogin = () => {
    if (!emailRef.current?.value) return;
    setUserData({
      name: "Jane Doe",
      email: emailRef.current?.value,
    });
    history.replace("/clients");
  };

  return (
    <IonGrid style={{ width: "100%" }}>
      <IonRow class="ion-align-items-center" style={{ height: "100%" }}>
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
            }}
          >
            <h1>Login Page</h1>
            <IonInput ref={emailRef} label="Email" type="email" fill="outline" labelPlacement="start"></IonInput>
            <IonInput
              ref={passwordRef}
              label="Password"
              type="password"
              fill="outline"
              labelPlacement="start"
            ></IonInput>
            <IonButton onClick={fakeLogin}>Sign In</IonButton>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default Login;
