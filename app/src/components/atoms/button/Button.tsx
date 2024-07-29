import { IonButton } from "@ionic/react";
import type { ComponentProps } from "react";

import "./Button.scss";
import clsx from "clsx";

interface ButtonProps extends ComponentProps<typeof IonButton> {
  innerRef?: any;
  variant?: "primary" | "secondary" | "outlined";
}

function Button(props: ButtonProps) {
  const { className: propClass, variant, ...buttonProps } = props;
  const variantClass: any = {
    primary: [],
    secondary: ["secondary"],
    outlined: ["outlined"],
  };

  const className = clsx(propClass || "", "c-button", variant && variantClass[variant]);

  return (
    <IonButton {...buttonProps} className={className}>
      {props.children}
    </IonButton>
  );
}

export default Button;
