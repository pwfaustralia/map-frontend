import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonSpinner, IonToolbar } from "@ionic/react";

import { useStoreState } from "easy-peasy";
import { isValidElement } from "react";
import StoreModel from "../../../../types/store";
import IconLink from "../../../molecules/icon-link/IconLink";
import "./DashboardTemplate.scss";
import { DashboardTemplatePartKeys, PageTemplateKeys } from "./types";

import { routes } from "../../../../helpers";
import useLogoutUser from "../../../../hooks/useLogoutUser";
import useUserRole from "../../../../hooks/useUserRole";
import clientsIcon from "./icons/clients-icon.svg";
import dashboardIcon from "./icons/dashboard-icon.svg";
import starIcon from "./icons/star-icon.svg";

function DashboardTemplate({ children }: { children: JSX.Element }) {
  const templateKey = PageTemplateKeys.DASHBOARD;
  const pageTemplates = useStoreState<StoreModel>((states) => states.page);
  const { isMutating: isLogoutLoading, logoutUser } = useLogoutUser();
  const { isAdminOrStaff, isClient, role } = useUserRole();

  const getTemplatePart = (partName: DashboardTemplatePartKeys) => {
    if (!pageTemplates[templateKey]) return <></>;
    if (!pageTemplates[templateKey][partName]) return <></>;
    let templatePart = pageTemplates[templateKey][partName];
    if (!isValidElement(templatePart)) return <></>;
    return templatePart;
  };

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
              <div slot="start">{getTemplatePart("toolbar-search")}</div>
              <div slot="end">{getTemplatePart("toolbar-avatar")}</div>
            </IonToolbar>
            <IonContent>{children}</IonContent>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
}

export default DashboardTemplate;
