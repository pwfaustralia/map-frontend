import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow, IonSpinner, IonText } from "@ionic/react";
import { ComponentProps, useEffect, useRef } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { useSearchClients } from "../../../services/queries";
import Chip from "../../atoms/chip/Chip";
import SearchDialog from "../../molecules/search-with-autocomplete/SearchDialog";

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
  const _searchKeyWord = useDebounce(searchKeyword, 1000);
  const [{ data, isLoading, isValidating }, controller] = useSearchClients(_searchKeyWord);

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

  if (searchKeyword !== _searchKeyWord && searchKeyword?.length) {
    return (
      <>
        <IonText>Searching for:</IonText>
        <Chip outline={true}>{searchKeyword}</Chip>
      </>
    );
  }

  if (isLoading || isValidating) {
    return (
      <CenterElement>
        <IonSpinner />
      </CenterElement>
    );
  }

  if (!data?.data) {
    return (
      <CenterElement>
        <IonText>Start typing to search!</IonText>
      </CenterElement>
    );
  }

  if (data?.data.length === 0) {
    return (
      <CenterElement>
        <IonText>No results</IonText>
      </CenterElement>
    );
  }
  return (
    <IonList>
      {data.data.map((q) => (
        <IonItem key={q.id}>
          <IonLabel>{q.full_name}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}

export default SearchClientsPopup;
