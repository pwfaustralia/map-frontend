import { IonCol, IonGrid, IonPage, IonRow, IonText } from "@ionic/react";

import "./LoginTemplate.css";

interface LoginTemplateProps {
  children?: JSX.Element;
}

function LoginTemplate(props: LoginTemplateProps) {
  const { children } = props;
  return (
    <IonPage className="login-template">
      <IonGrid>
        <IonRow>
          <IonCol sizeXs="12" sizeSm="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="12" sizeSm="9" sizeLg="8" style={{ background: "#fff" }}>
            <section>
              <IonText>Welcome to your Mortgage Action Plan</IonText>
              {children}
            </section>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
}

export default LoginTemplate;
