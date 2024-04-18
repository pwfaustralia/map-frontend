import { useStoreActions, useStoreState } from "easy-peasy";
import StoreModel from "../../lib/easy-peasy/models";
import { IonApp, IonButton, IonList, IonItem, IonLabel, IonContent } from "@ionic/react";
import { useHistory } from "react-router";
import "./ClientDashboard.css";

function ClientDashboard() {
  const name = useStoreState<StoreModel>((states) => states.user?.userData?.name);
  const logoutUser = useStoreActions<StoreModel>((actions) => actions.user.logout);
  const history = useHistory();

  const logout = () => {
    logoutUser();
    history.replace("/login");
  };

  return (
    <IonApp>      
      <div>
        <h1>Dashboard</h1>
        <h3>Hello {name}</h3>
        <IonButton onClick={logout}>Logout</IonButton>
      </div>
      <IonContent color="light">
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
    </IonApp>
  );
}

export default ClientDashboard;
