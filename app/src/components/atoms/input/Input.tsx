import { IonIcon, IonInput } from "@ionic/react";
import type { ComponentProps } from "react";

import "./Input.css";

interface InputProps extends ComponentProps<typeof IonInput> {
  innerRef?: any;
  icon?: string;
}

function Input(props: InputProps) {
  const { innerRef, className, icon, ...inputProps } = props;

  return (
    <IonInput {...inputProps} ref={innerRef} className={[className || "", "c-input"].join(" ")}>
      {icon && <IonIcon slot="start" icon={icon} aria-hidden="true" color="primary" size="large"></IonIcon>}
      {props.children}
    </IonInput>
  );
}

export default Input;
