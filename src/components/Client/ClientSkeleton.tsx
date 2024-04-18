import { IonCol, IonGrid, IonRow, IonSkeletonText } from "@ionic/react";

function ClientSkeleton() {
  return (
    <IonGrid>
      <IonRow>
        <IonCol size="32px">
          <IonSkeletonText color="#000000" animated={true} style={{ width: "56px", height: "56px" }}></IonSkeletonText>
        </IonCol>
        <IonCol>
          <IonSkeletonText color="#000000" animated={true} style={{ width: "120px", height: "13px" }}></IonSkeletonText>
          <IonSkeletonText color="#000000" animated={true} style={{ width: "120px", height: "8px" }}></IonSkeletonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default ClientSkeleton;
