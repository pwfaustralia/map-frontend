import { IonCol, IonGrid, IonRow } from "@ionic/react";
import InputWithLabel from "../input-with-label/InputWithLabel";

import { useEffect, useRef } from "react";
import "./SearchFilter.scss";

interface SearchFilterButtonRef {
  current: {
    getFilters: () => FilterProps["filters"];
    resetFilters: () => void;
  };
}

interface FilterProps {
  filters: {
    [key: string]: {
      label: string;
      value: string;
    };
  };
  onFilter?: (value: { id: string; value: string }[]) => void;
  buttonRefs?: {
    searchFilterButtonRef?: SearchFilterButtonRef;
  };
}

function SearchFilter(props: FilterProps) {
  const filters = useRef<any>([]);

  const getFilter = (key: string) => {
    if (!props.filters) return;
    return props.filters[key];
  };

  const getFilters = () => {
    return filters.current
      .map((q: any) => ({
        id: q.key,
        value: q.el.value,
      }))
      .filter((q: any) => q.value.length);
  };

  const resetFilters = () => {
    filters.current.forEach((filter: any) => {
      filter.value = "";
    });
    if (props.onFilter) {
      props.onFilter([]);
    }
  };

  useEffect(() => {
    let filtersLength = Object.keys(props.filters).length;
    filters.current = filters.current.slice(0, filtersLength);
  }, [props.filters]);

  useEffect(() => {
    if (props.buttonRefs?.searchFilterButtonRef) {
      props.buttonRefs.searchFilterButtonRef.current.getFilters = getFilters;
      props.buttonRefs.searchFilterButtonRef.current.resetFilters = resetFilters;
    }
  }, [props.filters]);

  return (
    <>
      <IonGrid className="Filter">
        <IonRow>
          {Object.keys(props.filters).map((key, index) => (
            <IonCol key={key}>
              <InputWithLabel
                label={getFilter(key)?.label || ""}
                innerRef={(el: any) => {
                  filters.current[index] = { key, el };
                }}
                value={getFilter(key)?.value || ""}
                config={{
                  grid: {
                    style: {
                      marginRight: "55px",
                    },
                  },
                  labelCol: {
                    size: "3",
                  },
                  inputCol: {
                    size: "7",
                  },
                }}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </>
  );
}

export default SearchFilter;
