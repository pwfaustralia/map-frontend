import React, { ComponentProps, useState } from "react";
import Checkbox from "../../atoms/checkbox/Checkbox";
import SelectOption from "../../atoms/select-option/SelectOption";
import Select from "../../atoms/select/Select";
import Text from "../../atoms/text/Text";

import "./AdvancedFilter.scss";
import Input from "../../atoms/input/Input";

HTMLDivElement;

interface AdvancedFilterProps {
  label: string;
  modifiers?: string[];
}

function AdvancedFilter(props: AdvancedFilterProps) {
  const { modifiers = ["contains", "equal", "not equal"], label } = props;
  const [visible, setVisible] = useState(false);

  return (
    <div className="AdvancedFilter">
      <Checkbox
        labelPlacement="end"
        onIonChange={(e) => {
          setVisible(e.target.checked);
        }}
      >
        <Text>{label}</Text>
      </Checkbox>
      {visible && (
        <>
          <Select label="Modifier" interface="popover" className="AdvancedFilter__modifier">
            {modifiers.map((mod) => (
              <SelectOption key={mod} value={mod}>
                {mod}
              </SelectOption>
            ))}
          </Select>
          <Input type="text" className="AdvancedFilter__input" />
        </>
      )}
    </div>
  );
}

export default AdvancedFilter;
