import { IonCheckbox } from "@ionic/react";
import type { ComponentProps } from "react";

import "./Checkbox.css";

interface CheckboxProps extends ComponentProps<typeof IonCheckbox> {
  innerRef?: any;
}

function Checkbox(props: CheckboxProps) {
  const { className, ...checkboxProps } = props;

  return (
    <IonCheckbox {...checkboxProps} className={[className || "", "c-checkbox"].join(" ")}>
      {props.children}
    </IonCheckbox>
  );
}

export default Checkbox;
