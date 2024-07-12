import { IonChip } from "@ionic/react";
import type { ComponentProps } from "react";

import "./Chip.scss";

interface ChipProps extends ComponentProps<typeof IonChip> {
  innerRef?: any;
}

function Chip(props: ChipProps) {
  const { className, ...ionProps } = props;

  return (
    <IonChip {...ionProps} className={[className || "", "c-chip"].join(" ")}>
      <span>{props.children}</span>
    </IonChip>
  );
}

export default Chip;
