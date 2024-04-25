import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonToolbar } from "@ionic/react";

import { useStoreState } from "easy-peasy";
import { isValidElement } from "react";
import StoreModel from "../../../../types/store";
import "./DashboardTemplate.scss";
import { DashboardTemplatePartKeys, PageTemplateKeys } from "./types";
import Links from "../../../atoms/Links";

function DashboardTemplate({ children }: { children: JSX.Element }) {
  const pageTemplates = useStoreState<StoreModel>((states) => states.page);
  const templateKey = PageTemplateKeys.DASHBOARD;

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
            <Links />
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
