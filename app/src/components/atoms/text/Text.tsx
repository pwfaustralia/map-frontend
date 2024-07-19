import { IonText } from "@ionic/react";
import type { ComponentProps } from "react";

interface TextProps extends ComponentProps<typeof IonText> {
  innerRef?: any;
  additionalClass?: string;
}

function Text(props: TextProps) {
  const { innerRef, className, additionalClass, ...inputProps } = props;

  return (
    <IonText
      {...inputProps}
      ref={innerRef}
      className={[className || "", "c-text", additionalClass].filter((q) => !!q).join(" ")}
    />
  );
}

export default Text;
