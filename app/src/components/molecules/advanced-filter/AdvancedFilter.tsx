import React, { ComponentProps, useEffect, useRef, useState } from "react";
import Checkbox from "../../atoms/checkbox/Checkbox";
import SelectOption from "../../atoms/select-option/SelectOption";
import Select from "../../atoms/select/Select";
import Text from "../../atoms/text/Text";

import classNames from "classnames";
import Input from "../../atoms/input/Input";
import "./AdvancedFilter.scss";

export type CheckboxProps = Omit<ComponentProps<typeof Checkbox>, "children" | "labelPlacement">;
export type ModifierProps = Omit<ComponentProps<typeof Select>, "children">;
export type InputProps = Omit<ComponentProps<typeof Input>, "children">;

interface AdvancedFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  modifiers?: string[];
  modifierProps?: ModifierProps;
  inputProps?: InputProps;
  checkBoxProps?: CheckboxProps;
  defaultModifier?: string;
  disabled?: boolean;
}

export const advancedFilterDefaultModifiers = ["contains", "starts with", "not contains", "equal", "not equal"];

function AdvancedFilter(props: AdvancedFilterProps) {
  const {
    modifiers = advancedFilterDefaultModifiers,
    label,
    defaultModifier,
    modifierProps: { className: selectCn } = {},
    inputProps: { className: inputCn } = {},
    modifierProps,
    inputProps,
    checkBoxProps,
    className,
    disabled,
    ...divProps
  } = props;
  const { onIonChange, ...restCheckBoxProps } = checkBoxProps || {};
  const { onIonChange: onModifierChange } = modifierProps || {};

  const [visible, setVisible] = useState(false);
  const defaultModValue = defaultModifier || modifiers[0];
  const modifierValue = useRef<string>(defaultModValue);
  const inputRef = useRef<any>();

  return (
    <div className={classNames("AdvancedFilter", className)} {...divProps}>
      <Checkbox
        labelPlacement="end"
        disabled={disabled}
        onIonChange={(e) => {
          if (onIonChange) {
            onIonChange(e);
          }
          setVisible(e.target.checked);
        }}
        {...restCheckBoxProps}
      >
        <Text>{label}</Text>
      </Checkbox>
      {visible && (
        <>
          <Select
            label="Modifier"
            disabled={disabled}
            value={modifierValue.current}
            interface="popover"
            className={classNames("AdvancedFilter__modifier", selectCn)}
            {...modifierProps}
            onIonChange={(e) => {
              if (onModifierChange) {
                onModifierChange(e);
              }
              modifierValue.current = e.target.value;
              inputRef.current.value = "";
            }}
          >
            {modifiers.map((mod) => (
              <SelectOption key={mod} value={mod}>
                {mod}
              </SelectOption>
            ))}
          </Select>
          <Input
            disabled={disabled}
            innerRef={inputRef}
            type="text"
            className={classNames("AdvancedFilter__input", inputCn)}
            {...inputProps}
          />
        </>
      )}
    </div>
  );
}

export default AdvancedFilter;
