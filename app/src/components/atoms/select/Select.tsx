import { IonSelect } from "@ionic/react";
import classNames from "classnames";
import type { ComponentProps } from "react";

interface SelectProps extends ComponentProps<typeof IonSelect> {
  innerRef?: any;
  children: React.ReactNode | React.ReactNode[];
}

function Select(props: SelectProps) {
  const { className, ...selectProps } = props;

  return (
    <IonSelect {...selectProps} className={classNames("c-select", className)}>
      {props.children}
    </IonSelect>
  );
}

export default Select;
