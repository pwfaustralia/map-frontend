import { IonButton, IonSpinner, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import StoreModel from "../../types/store";

import Links from "../../components/atoms/Links";
import ClientsTable from "../../components/organisms/clients-table/ClientsTable";
import { PageTemplateKeys } from "../../components/templates/dashboard/default/types";
import useLogoutUser from "../../hooks/useLogoutUser";
import "./ClientsPage.css";

function ClientsPage() {
  const name = useStoreState<StoreModel>((states) => states.user?.userData?.name);
  const { logoutUser, isMutating: isLogoutLoading } = useLogoutUser();
  const setPart = useStoreActions<StoreModel>((actions) => actions.page.setTemplatePart);

  useIonViewWillEnter(() => {
    setPart({
      templateName: PageTemplateKeys.DASHBOARD,
      parts: {
        "toolbar-search": <h1>Client Page</h1>,
      },
    });
  }, []);
  useIonViewWillLeave(() => {
    setPart({
      templateName: PageTemplateKeys.DASHBOARD,
      parts: null,
    });
  }, []);
  return (
    <>
      <h1>Clients Page</h1>
      <h3>Hello {name}</h3>
      <IonButton onClick={logoutUser} disabled={isLogoutLoading}>
        Logout
        {isLogoutLoading && <IonSpinner />}
      </IonButton>
      <Links />
      <ClientsTable countPerPage={20} />
    </>
  );
}

export default ClientsPage;
