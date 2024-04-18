import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Suspense, useState } from "react";
import { useHistory } from "react-router";
import ClientsList from "../../components/Client/ClientsList";
import StoreModel from "../../types/store";

import "./ClientsPage.css";

function ClientsPage() {
  const [page, setPage] = useState(1);
  const name = useStoreState<StoreModel>((states) => states.user?.userData?.name);
  const logoutUser = useStoreActions<StoreModel>((actions) => actions.user.logout);
  const history = useHistory();

  const logout = () => {
    logoutUser();
    history.replace("/login");
  };

  return (
    <IonPage>
      <h1>Clients Page</h1>
      <h3>Hello {name}</h3>
      <IonButton onClick={logout}>Logout</IonButton>

      <IonContent>
        <Suspense fallback={<h2>Loading clients...</h2>}>
          <ClientsList pageIndex={page} setPage={setPage} countPerPage={10} />
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

export default ClientsPage;
