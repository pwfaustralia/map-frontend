import { IonCol, IonGrid, IonRow } from "@ionic/react";
import type { ComponentProps } from "react";
import Input from "../../atoms/input/Input";

import Text from "../../atoms/text/Text";
import "./InputWithLabel.scss";

interface InputWithLabelProps extends ComponentProps<typeof Input> {
  label: string;
  config?: {
    labelCol?: ComponentProps<typeof IonCol>;
    inputCol?: ComponentProps<typeof IonCol>;
    grid?: ComponentProps<typeof IonGrid>;
  };
}

function InputWithLabel(props: InputWithLabelProps) {
  const { innerRef, label, config, ...inputProps } = props;
  const { labelCol = {}, inputCol = {}, grid = {} } = config || {};

  return (
    <IonGrid className="InputWithLabel" {...grid}>
      <IonRow>
        <IonCol className="InputWithLabel__label_col" {...labelCol}>
          <Text className="InputWithLabel__label">{label}</Text>
        </IonCol>
        <IonCol className="InputWithLabel__input_col" {...inputCol}>
          <Input {...inputProps} innerRef={innerRef} additionalClass="InputWithLabel__input" />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default InputWithLabel;
