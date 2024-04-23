import { IonButton, IonContent, IonPage, IonSpinner } from "@ionic/react";
import { useStoreState } from "easy-peasy";
import { useState } from "react";
import StoreModel from "../../types/store";

import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import ClientsTable from "../../components/organisms/clients-table/ClientsTable";
import useLogoutUser from "../../hooks/useLogoutUser";
import "./ClientsPage.css";

function ClientsPage() {
  const [page, setPage] = useState(1);
  const name = useStoreState<StoreModel>((states) => states.user?.userData?.name);
  const { logoutUser, isMutating: isLogoutLoading } = useLogoutUser();
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
        <Link to="/dashboard">Dashboard</Link>&nbsp;
        <Link to="/clients">Clients</Link>
        <ClientsTable countPerPage={10} />
        {/* <ClientsList pageIndex={page} setPage={setPage} countPerPage={10} /> */}
      </IonContent>
    </IonPage>
  );
}

export default ClientsPage;
