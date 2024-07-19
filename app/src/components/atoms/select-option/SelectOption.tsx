import { IonSelectOption } from "@ionic/react";
import type { ComponentProps } from "react";

interface SelectOptionProps extends ComponentProps<typeof IonSelectOption> {
  innerRef?: any;
  children: React.ReactNode | React.ReactNode[];
}

function SelectOption(props: SelectOptionProps) {
  const { className, ...selectOptionProps } = props;

  return (
    <IonSelectOption {...selectOptionProps} className={[className || "", "c-select-option"].join(" ")}>
      {props.children}
    </IonSelectOption>
  );
}

export default SelectOption;
