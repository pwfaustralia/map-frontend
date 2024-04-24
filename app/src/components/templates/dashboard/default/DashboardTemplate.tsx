import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";

import { useStoreState } from "easy-peasy";
import StoreModel from "../../../../types/store";
import "./DashboardTemplate.css";
import { DashboardTemplatePartKeys, PageTemplateKeys } from "./types";
import { isValidElement } from "react";

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
      <IonContent>
        <IonGrid className="dashboard__template">
          <IonRow>
            <IonCol>{getTemplatePart("toolbar-search")}</IonCol>
            <IonCol>{children}</IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default DashboardTemplate;
