import { IonCol, IonGrid, IonRow } from "@ionic/react";
import InputWithLabel from "../input-with-label/InputWithLabel";

import "./Filter.scss";
import { useRef } from "react";
import Button from "../../atoms/button/Button";

interface FilterProps {
  filters: {
    [key: string]: {
      label: string;
      value: string;
    };
  };
  onFilter?: (value: { id: string; value: string }[]) => void;
}

function Filter(props: FilterProps) {
  const filters = useRef<FilterProps["filters"]>(props.filters);

  return (
    <>
      <IonGrid className="Filter">
        <IonRow>
          {Object.keys(filters.current).map((key) => (
            <IonCol key={key}>
              <InputWithLabel
                label={filters.current[key].label}
                onKeyUp={(e: any) => {
                  filters.current[key].value = e.target.value;
                }}
                value={filters.current[key].value}
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
      <Button
        onClick={() => {
          if (props.onFilter) {
            props.onFilter(
              Object.keys(filters.current)
                .map((q) => ({
                  id: q,
                  value: filters.current[q].value,
                }))
                .filter((q) => q.value.length)
            );
          }
        }}
      >
        Testing
      </Button>
    </>
  );
}

export default Filter;
