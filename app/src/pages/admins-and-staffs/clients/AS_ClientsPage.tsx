import { useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import { useStoreActions } from "easy-peasy";
import StoreModel from "../../../types/store";

import { useRef } from "react";
import SearchWithAutoComplete from "../../../components/molecules/search-with-autocomplete/SearchWithAutocomplete";
import ClientsTable from "../../../components/organisms/clients-table/ClientsTable";
import DashboardTemplate from "../../../components/templates/dashboard/default/DashboardTemplate";
import { PageTemplateKeys } from "../../../components/templates/dashboard/default/types";
import "./AS_ClientsPage.css";

function AS_ClientsPage() {
  const setPart = useStoreActions<StoreModel>((actions) => actions.page.setTemplatePart);
  const t = useRef<any>();

  useIonViewWillEnter(() => {
    setPart({
      templateName: PageTemplateKeys.DASHBOARD,
      parts: {
        "toolbar-search": (
          <>
            <SearchWithAutoComplete placeholder="Search a client here" animated={true} />
          </>
        ),
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
    <DashboardTemplate>
      <>
        <SearchWithAutoComplete placeholder="Search a client here" animated={true} />
        <ClientsTable countPerPage={20} />
      </>
    </DashboardTemplate>
  );
}

export default AS_ClientsPage;
