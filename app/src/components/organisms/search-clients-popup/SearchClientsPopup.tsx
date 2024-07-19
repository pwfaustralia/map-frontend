import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow, IonSpinner } from "@ionic/react";
import { ComponentProps, useEffect, useRef } from "react";
import { useSearchClientsFast } from "../../../services/queries";
import SearchDialog from "../../molecules/search-with-autocomplete/SearchDialog";
import Text from "../../atoms/text/Text";

interface SearchClientsPopupProps {
  inputProps?: ComponentProps<typeof SearchDialog>;
  searchKeyword?: string;
  setSearchKeyWord: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface SearchClientsContentProps {
  searchKeyword?: string;
  searchRef?: React.MutableRefObject<any>;
  modal?: React.RefObject<HTMLIonModalElement>;
}

function SearchClientsPopup(props: SearchClientsPopupProps) {
  const { inputProps, searchKeyword, setSearchKeyWord } = props;
  const searchRef = useRef<any>({});

  return (
    <SearchDialog
      {...inputProps}
      value={searchKeyword}
      onKeyDown={(e) => {
        if (searchRef.current?.controller) {
          searchRef.current.controller.abort();
        }
      }}
      onDissmissed={() => {
        setSearchKeyWord("");
      }}
    >
      <SearchClientsContent searchKeyword={searchKeyword} searchRef={searchRef} />
    </SearchDialog>
  );
}

function SearchClientsContent({ searchKeyword, searchRef, modal }: SearchClientsContentProps) {
  const [{ data, isLoading, isValidating }, controller] = useSearchClientsFast(
    searchKeyword
      ? [
          {
            exhaustive_search: true,
            highlight_full_fields:
              "first_name,last_name,middle_name,preferred_name,email,home_phone,work_phone,mobile_phone,physical_address.town,physical_address.street_name,fax",
            collection: "clients",
            facet_by: "first_name,last_name",
            q: searchKeyword,
            query_by:
              "first_name,last_name,middle_name,preferred_name,email,home_phone,work_phone,mobile_phone,physical_address.town,physical_address.street_name,fax",
            max_facet_values: 10,
            page: 1,
            per_page: 12,
          },
        ]
      : null
  );
  const { hits: searchResults, out_of: searchTotal, found } = data?.[0] || { hits: [], total: 0 };

  useEffect(() => {
    if (!!searchRef) {
      searchRef.current = {
        controller,
      };
    }
  }, [controller]);

  useEffect(() => {
    if (!!modal?.current) {
      modal.current.onDidDismiss().then(() => {
        controller.abort();
      });
    }
  }, [modal]);

  const CenterElement = ({ children }: { children: any }) => {
    return (
      <IonGrid class="ion-justify-content-center" style={{ display: "flex" }}>
        <IonRow>
          <IonCol>{children}</IonCol>
        </IonRow>
      </IonGrid>
    );
  };

  if (isLoading || isValidating) {
    return (
      <CenterElement>
        <IonSpinner />
      </CenterElement>
    );
  }

  if (!searchKeyword) {
    return (
      <CenterElement>
        <Text>Start typing to search!</Text>
      </CenterElement>
    );
  }

  if (searchResults.length === 0) {
    return (
      <CenterElement>
        <Text>No results</Text>
      </CenterElement>
    );
  }
  return (
    <IonList>
      <CenterElement>
        <Text>
          {found} out of {searchTotal}
        </Text>
      </CenterElement>
      {searchResults.map((q: any) => (
        <IonItem key={q.document.id}>
          <IonLabel>
            {q.document.first_name} {q.document.last_name}
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}

export default SearchClientsPopup;
