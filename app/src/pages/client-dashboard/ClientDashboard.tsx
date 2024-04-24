import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  useIonViewWillEnter,
} from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import Links from "../../components/atoms/Links";
import { PageTemplateKeys } from "../../components/templates/dashboard/default/types";
import useLogoutUser from "../../hooks/useLogoutUser";
import StoreModel from "../../types/store";
import "./ClientDashboard.css";

function ClientDashboard() {
  const {
    userData: { name },
  } = useStoreState<StoreModel>((states) => states.user);
  const { logoutUser, isMutating: isLogoutLoading } = useLogoutUser();
  const setPart = useStoreActions<StoreModel>((actions) => actions.page.setTemplatePart);

  useIonViewWillEnter(() => {
    setPart({
      templateName: PageTemplateKeys.DASHBOARD,
      parts: {
        "toolbar-search": <h1>Client Dashboard</h1>,
      },
    });
  }, []);

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <h3>Hello {name}</h3>
        <IonButton onClick={logoutUser} disabled={isLogoutLoading}>
          Logout
          {isLogoutLoading && <IonSpinner />}
        </IonButton>
        <Links />
      </div>
      <IonList inset={true}>
        <IonItem>
          <IonLabel>Bob Susan</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>susan Bob</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Jeremy Jones</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>James</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Steve</IonLabel>
        </IonItem>
      </IonList>
    </>
  );
}

export default ClientDashboard;
