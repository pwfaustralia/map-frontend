import { IonItem, IonLabel, IonList } from "@ionic/react";
import DashboardTemplate from "../../../components/templates/dashboard/default/DashboardTemplate";
import "./C_Dashboard.css";

function C_Dashboard() {
  return (
    <DashboardTemplate>
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
    </DashboardTemplate>
  );
}

export default C_Dashboard;
