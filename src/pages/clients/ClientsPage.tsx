import { useStoreActions, useStoreState } from "easy-peasy";
import StoreModel from "../../lib/easy-peasy/models";
import { IonApp, IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import "./ClientsPage.css";

function ClientsPage() {
  const name = useStoreState<StoreModel>((states) => states.user?.userData?.name);
  const logoutUser = useStoreActions<StoreModel>((actions) => actions.user.logout);
  const history = useHistory();

  const logout = () => {
    logoutUser();
    history.replace("/login");
  };

  return (
      <div>
      <h1>Clients Page</h1>
      <h3>Hello {name}</h3>
      <IonButton onClick={logout}>Logout</IonButton>
    </div>
  );
}

export default ClientsPage;
