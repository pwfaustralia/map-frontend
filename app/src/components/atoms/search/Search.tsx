import { IonIcon, IonSearchbar } from "@ionic/react";
import type { ComponentProps } from "react";

import "./Search.scss";

interface InputProps extends ComponentProps<typeof IonSearchbar> {
  innerRef?: any;
  additionalClass?: string;
}

function Search(props: InputProps) {
  const { innerRef, className, searchIcon, additionalClass, ...inputProps } = props;

  return (
    <IonSearchbar
      {...inputProps}
      ref={innerRef}
      className={[className || "", "c-search", additionalClass].filter((q) => !!q).join(" ")}
    />
  );
}

export default Search;
