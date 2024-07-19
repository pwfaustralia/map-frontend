import { IonCol, IonGrid, IonPage, IonRow } from "@ionic/react";

import "./LoginTemplate.css";
import Text from "../../../atoms/text/Text";

interface LoginTemplateProps {
  children?: React.ReactNode | React.ReactNode[];
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
              <Text className="form__header--text">
                Welcome to your <Text color="secondary">Mortgage Action Plan</Text>
              </Text>
              {children}
            </section>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
}

export default LoginTemplate;
