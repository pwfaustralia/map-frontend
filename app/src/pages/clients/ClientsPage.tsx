import { IonButton, IonContent, IonPage, IonSpinner } from "@ionic/react";
import { useStoreState } from "easy-peasy";
import { Suspense, useState } from "react";
import ClientsList from "../../components/Client/ClientsList";
import StoreModel from "../../types/store";

import useLogoutUser from "../../hooks/useLogoutUser";
import "./ClientsPage.css";
import { useHistory } from "react-router";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";

function ClientsPage() {
  const [page, setPage] = useState(1);
  const name = useStoreState<StoreModel>((states) => states.user?.userData?.name);
  const { logoutUser, isLoading: isLogoutLoading } = useLogoutUser();
  const history = useHistory();
  return (
    <IonPage>
      <IonContent color="light">
        <h1>Clients Page</h1>
        <h3>Hello {name}</h3>
        <IonButton onClick={logoutUser} disabled={isLogoutLoading}>
          Logout
          {isLogoutLoading && <IonSpinner />}
        </IonButton>
        <IonButton onClick={() => history.push("/dashboard")}>Dashboard</IonButton>
        <IonButton onClick={() => history.push("/clients")}>Clients</IonButton>
        <Suspense fallback={<h2>Loading clients...</h2>}>
          <ClientsList pageIndex={page} setPage={setPage} countPerPage={10} />
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

export default ClientsPage;
