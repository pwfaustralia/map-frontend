import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonSpinner, IonToolbar } from "@ionic/react";

import { useState } from "react";
import IconLink from "../../../molecules/icon-link/IconLink";
import "./DashboardTemplate.scss";

import { routes } from "../../../../helpers";
import useLogoutUser from "../../../../hooks/useLogoutUser";
import useUserRole from "../../../../hooks/useUserRole";
import { useSearchClientsFast } from "../../../../services/queries";
import SearchPopup from "../../../organisms/search-popup/SearchPopup";
import clientsIcon from "./icons/clients-icon.svg";
import dashboardIcon from "./icons/dashboard-icon.svg";
import starIcon from "./icons/star-icon.svg";

function DashboardTemplate({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const [searchKeyword, setSearchKeyword] = useState<string>();
  const { isMutating: isLogoutLoading, logoutUser } = useLogoutUser();
  const { isAdminOrStaff } = useUserRole();
  const searchableFields = [
    "first_name",
    "last_name",
    "middle_name",
    "preferred_name",
    "email",
    "home_phone",
    "work_phone",
    "mobile_phone",
    "physical_address.town",
    "physical_address.street_name",
    "fax",
  ];

  return (
    <IonPage>
      <IonGrid className="DashboardTemplate">
        <IonRow>
          <IonCol size="1.5">
            <div className="DashboardTemplate__logo"></div>
            {isAdminOrStaff && (
              <IconLink to={routes.C.dashboard} icon={dashboardIcon} replace={true}>
                Dashboard
              </IconLink>
            )}
            {isAdminOrStaff && (
              <IconLink to={routes.AS.clients} icon={clientsIcon} replace={true}>
                Clients
              </IconLink>
            )}
            <IconLink
              to="/logout"
              icon={starIcon}
              replace={true}
              onClick={(e) => {
                e.preventDefault();
                logoutUser();
              }}
            >
              Logout
              {isLogoutLoading && <IonSpinner />}
            </IconLink>
          </IonCol>
          <IonCol size="10.5">
            <IonToolbar>
              <div slot="start">
                <SearchPopup
                  inputProps={{
                    placeholder: "Search a client here",
                    animated: true,
                    onIonInput: (e) => {
                      setSearchKeyword(e.target?.value || "");
                    },
                  }}
                  searchKeyword={searchKeyword}
                  setSearchKeyWord={setSearchKeyword}
                  fetcher={useSearchClientsFast}
                  searchParams={{
                    highlight_full_fields: searchableFields.join(","),
                    collection: "clients",
                    query_by: searchableFields.join(","),
                    page: 1,
                    num_typos: searchableFields.map((q) => 10).join(","),
                    per_page: 12,
                  }}
                />
              </div>
              <div slot="end">AVATAR</div>
            </IonToolbar>
            <IonContent>{children}</IonContent>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
}

export default DashboardTemplate;
