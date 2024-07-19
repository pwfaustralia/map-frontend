import { IonCol, IonGrid, IonRow } from "@ionic/react";
import AdvancedFilter from "../../molecules/advanced-filter/AdvancedFilter";

import "./ClientsAdvancedFilters.scss";
import Text from "../../atoms/text/Text";

function ClientsAdvancedFilters() {
  const filters = [
    {
      label: "First Name",
      id: "first_name",
    },
    {
      label: "Last Name",
      id: "last_name",
    },
    {
      label: "Email",
      id: "email",
    },
    {
      label: "Phone",
      id: "phone",
    },
    {
      label: "Street",
      id: "street",
    },
  ];
  return (
    <IonGrid className="ClientsAdvancedFilters">
      <Text>
        <h4>Filter Clients by</h4>
      </Text>
      {filters.map((filter) => (
        <IonRow key={filter.id}>
          <IonCol>
            <AdvancedFilter label={filter.label} />
          </IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
}

export default ClientsAdvancedFilters;
