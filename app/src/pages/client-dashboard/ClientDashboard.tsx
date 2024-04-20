import { IonButton, IonContent, IonItem, IonLabel, IonList, IonPage, IonSpinner } from "@ionic/react";
import { useStoreState } from "easy-peasy";
import { useHistory } from "react-router";
import useLogoutUser from "../../hooks/useLogoutUser";
import StoreModel from "../../types/store";
import "./ClientDashboard.css";

function ClientDashboard() {
  const {
    userData: { name },
    userPermissions,
  } = useStoreState<StoreModel>((states) => states.user);
  const { logoutUser, isMutating: isLogoutLoading } = useLogoutUser();
  const history = useHistory();

  return (
    <IonPage>
      <IonContent color="light">
        <div>
          <h1>Dashboard</h1>
          <h3>Hello {name}</h3>
          <IonButton onClick={logoutUser} disabled={isLogoutLoading}>
            Logout
            {isLogoutLoading && <IonSpinner />}
          </IonButton>
          <IonButton onClick={() => history.push("/dashboard")}>Dashboard</IonButton>
          {userPermissions.includes("view-all-clients") && (
            <IonButton onClick={() => history.push("/clients")}>Clients</IonButton>
          )}
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
      </IonContent>
    </IonPage>
  );
}

export default ClientDashboard;
