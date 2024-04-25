import { useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import { useStoreActions } from "easy-peasy";
import StoreModel from "../../types/store";

import ClientsTable from "../../components/organisms/clients-table/ClientsTable";
import { PageTemplateKeys } from "../../components/templates/dashboard/default/types";
import "./ClientsPage.css";

function ClientsPage() {
  const setPart = useStoreActions<StoreModel>((actions) => actions.page.setTemplatePart);

  useIonViewWillEnter(() => {
    setPart({
      templateName: PageTemplateKeys.DASHBOARD,
      parts: {
        "toolbar-search": <h1>Client Page</h1>,
        "toolbar-avatar": <h1>avatar</h1>,
      },
    });
  });
  useIonViewWillLeave(() => {
    setPart({
      templateName: PageTemplateKeys.DASHBOARD,
      parts: null,
    });
  });
  return (
    <>
      <ClientsTable countPerPage={20} />
    </>
  );
}

export default ClientsPage;
