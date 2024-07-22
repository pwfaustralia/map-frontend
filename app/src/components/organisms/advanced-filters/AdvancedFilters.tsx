import { IonCol, IonGrid, IonRow } from "@ionic/react";
import AdvancedFilter, {
  advancedFilterDefaultModifiers,
  InputProps,
  ModifierProps,
} from "../../molecules/advanced-filter/AdvancedFilter";

import classNames from "classnames";
import { ComponentProps, useRef } from "react";
import Text from "../../atoms/text/Text";
import "./AdvancedFilters.scss";

export type FilterValue = {
  id: string;
  label: string;
  modifier: string;
  value: string | null;
  visible: boolean;
  index: number;
  q?: string;
  query_by?: string;
};
export type AdvancedFilterValues = { [key: string]: FilterValue };

interface AdvancedFiltersProps extends ComponentProps<typeof IonGrid> {
  label?: string;
  filters?: ({ label: string; id: string; value?: string; visible?: boolean } | any)[];
  advancedFilterProps?: Omit<
    ComponentProps<typeof AdvancedFilter>,
    "children" | "label" | "modifierProps" | "inputProps"
  >;
  onFilter?: (allValues: AdvancedFilterValues, value: FilterValue) => void;
  modifierProps?: ModifierProps;
  inputProps?: InputProps;
  disabled?: boolean;
}

function AdvancedFilters(props: AdvancedFiltersProps) {
  const {
    label,
    filters,
    modifierProps,
    onFilter,
    inputProps,
    advancedFilterProps,
    className,
    disabled,
    ...advancedFiltersProps
  } = props;

  const allFilterValues = useRef<AdvancedFilterValues>({});

  const onFilterChange = (id: string, label: string, visible: boolean, value?: any, modifier?: any) => {
    if (!onFilter) return;
    if (value) value = value.toString();

    const defaultMods =
      allFilterValues.current[id]?.modifier ||
      advancedFilterProps?.defaultModifier ||
      advancedFilterDefaultModifiers[0];
    modifier = modifier ? modifier.toString() : defaultMods;

    let res = {
      id,
      label,
      modifier,
      visible,
      value,
      index: Object.keys(allFilterValues.current).length + 1,
    };
    modifier = allFilterValues.current[id] = res;
    onFilter(allFilterValues.current, res);
  };

  return (
    <IonGrid className={classNames("AdvancedFilters", className)} {...advancedFiltersProps}>
      <Text>
        <h4>{label}</h4>
      </Text>
      {filters &&
        filters
          .sort((a) => (allFilterValues.current[a.id]?.visible === true ? -1 : 0))
          .sort((a, b) => {
            let aa = allFilterValues.current[a.id];
            let bb = allFilterValues.current[b.id];
            return aa?.visible && bb?.visible ? aa.index - bb.index : 0;
          })
          .map((filter) => (
            <IonRow key={filter.id}>
              <IonCol>
                <AdvancedFilter
                  label={filter.label}
                  {...advancedFilterProps}
                  disabled={disabled}
                  checkBoxProps={{
                    checked: filter.visible,
                    onIonChange: (e) => {
                      onFilterChange(filter.id, filter.label, e.target.checked);
                    },
                  }}
                  visible={filter.visible}
                  defaultModifier={allFilterValues.current[filter.id]?.modifier}
                  modifierProps={{
                    ...modifierProps,
                    onIonChange: (e) => {
                      onFilterChange(filter.id, filter.label, true, null, e.target.value);
                    },
                  }}
                  inputProps={{
                    ...inputProps,
                    onKeyUp: (e) => {
                      onFilterChange(filter.id, filter.label, true, e.currentTarget.value);
                    },
                  }}
                />
              </IonCol>
            </IonRow>
          ))}
    </IonGrid>
  );
}

export default AdvancedFilters;
