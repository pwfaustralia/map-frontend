import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow, IonSpinner } from "@ionic/react";
import { ComponentProps, useEffect, useRef } from "react";
import { SWRResponse } from "swr";
import Text from "../../atoms/text/Text";
import SearchDialog from "../../molecules/search-with-autocomplete/SearchDialog";

interface SearchPopupProps extends SearchContentProps {
  inputProps?: ComponentProps<typeof SearchDialog>;
  searchKeyword?: string;
  setSearchKeyWord: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface SearchContentProps {
  searchKeyword?: string;
  searchRef?: React.MutableRefObject<any>;
  modal?: React.RefObject<HTMLIonModalElement>;
  searchParams: object;
  fetcher: (params: any) => [SWRResponse<any>, AbortController];
}

function SearchPopup(props: SearchPopupProps) {
  const { inputProps, searchKeyword, setSearchKeyWord, ...searchContentProps } = props;
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
      <SearchContent searchKeyword={searchKeyword} searchRef={searchRef} {...searchContentProps} />
    </SearchDialog>
  );
}

function SearchContent({ searchKeyword, searchRef, modal, searchParams, fetcher }: SearchContentProps) {
  const [{ data, isLoading, isValidating }, controller] = fetcher(
    searchKeyword
      ? [
          {
            ...searchParams,
            ...{
              q: searchKeyword,
            },
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

export default SearchPopup;
