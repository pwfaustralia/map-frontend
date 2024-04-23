import { IonButton } from "@ionic/react";
import type { ComponentProps } from "react";

import "./Button.css";

interface ButtonProps extends ComponentProps<typeof IonButton> {
  innerRef?: any;
}

function Button(props: ButtonProps) {
  const { className, ...buttonProps } = props;

  return (
    <IonButton {...buttonProps} className={[className || "", "c-button"].join(" ")}>
      {props.children}
    </IonButton>
  );
}

export default Button;
