import { IonItem, IonLabel, IonList, useIonViewWillEnter } from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { PageTemplateKeys } from "../../components/templates/dashboard/default/types";
import StoreModel from "../../types/store";
import "./ClientDashboard.css";

function ClientDashboard() {
  const {
    userData: { name },
  } = useStoreState<StoreModel>((states) => states.user);
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
