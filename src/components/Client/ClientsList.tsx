import { IonButton, IonIcon, IonItem, IonLabel, IonList, IonThumbnail } from "@ionic/react";
import { person } from "ionicons/icons";
import { useClients } from "../../services/queries";
import ClientSkeleton from "./ClientSkeleton";

interface ClientsListProps {
  pageIndex: number;
  countPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function ClientsList({ pageIndex, countPerPage, setPage }: ClientsListProps) {
  const { data: clientsList, isLoading } = useClients(pageIndex, countPerPage);
  const paginationLinks = new Array(clientsList?.last_page || 0).fill(0).map((q, i) => i + 1);

  const handlePageClick = (page: number) => {
    setPage(page);
  };

  const Pagination = () => (
    <>
      <IonButton onClick={() => handlePageClick(1)} fill="clear">
        First
      </IonButton>
      <IonButton onClick={() => handlePageClick(pageIndex - 1)}>Previous</IonButton>
      {paginationLinks.slice(Math.max(pageIndex - 5, 0), pageIndex + 5 + Math.min(pageIndex - 5, 0) * -1).map((i) => (
        <IonButton key={i} fill={pageIndex === i ? "outline" : "clear"} onClick={() => handlePageClick(i)}>
          {i}
        </IonButton>
      ))}
      <IonButton onClick={() => handlePageClick(pageIndex + 1)}>Next</IonButton>
      <IonButton onClick={() => handlePageClick(clientsList?.last_page || 0)} fill="clear">
        Last
      </IonButton>
    </>
  );

  if (isLoading) {
    return (
      <IonList>
        {new Array(countPerPage).fill(0).map((a, i) => (
          <IonItem key={i}>
            <ClientSkeleton />
          </IonItem>
        ))}
      </IonList>
    );
  }
  if (!clientsList?.data?.length) {
    return (
      <>
        <h2 style={{ color: "#000" }}>No clients found!</h2>
        <Pagination />
      </>
    );
  }
  if (clientsList?.data?.length) {
    return (
      <IonList>
        {clientsList.data.map((client) => (
          <IonItem key={client.id}>
            <IonThumbnail slot="start">
              <IonIcon style={{ width: "100%", height: "100%" }} icon={person}></IonIcon>
            </IonThumbnail>
            <IonLabel>
              <h3>
                {client.first_name} {client.last_name}
              </h3>
              <p>{client.email}</p>
            </IonLabel>
          </IonItem>
        ))}
        <Pagination />
      </IonList>
    );
  }
}

export default ClientsList;
