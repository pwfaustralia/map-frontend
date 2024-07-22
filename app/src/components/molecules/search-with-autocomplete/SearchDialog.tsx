import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonToolbar, createAnimation } from "@ionic/react";
import React, { ReactElement, ReactNode, useRef, type ComponentProps } from "react";

import { isDesktop } from "../../../helpers";
import Search from "../../atoms/search/Search";
import "./SearchDialog.scss";
import { SearchClientsContentProps } from "../../organisms/search-popup/SearchPopup";

interface SearchDialogProps extends ComponentProps<typeof Search> {
  triggerLabel?: string;
  children?: ReactElement<SearchClientsContentProps>;
  onDissmissed?: () => void;
}

function SearchDialog(props: SearchDialogProps) {
  const searchRef = useRef<HTMLIonSearchbarElement>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const { children, triggerLabel, onDissmissed = () => {}, ...searchProps } = props;
  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;
    const dialogHeight = root?.querySelector('[role="dialog"]')?.getBoundingClientRect().height;

    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector("ion-backdrop")!)
      .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

    const wrapperAnimation = createAnimation()
      .addElement(root?.querySelector(".modal-wrapper")!)
      .keyframes([
        { offset: 0, opacity: "0", transform: `translateY(-${dialogHeight}px)` },
        { offset: 1, opacity: "1", transform: "translateY(0)" },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing("ease-in-out")
      .duration(200)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl: HTMLElement) => {
    return enterAnimation(baseEl).direction("reverse");
  };
  return (
    <section className="SearchDialog">
      <Search
        onClick={() => {
          modal.current?.present();
        }}
        className="SearchDialog__trigger"
        placeholder={triggerLabel || searchProps.placeholder || ""}
      ></Search>
      <IonModal
        enterAnimation={enterAnimation}
        leaveAnimation={leaveAnimation}
        ref={modal}
        handle={false}
        onDidPresent={() => {
          searchRef.current?.setFocus();
        }}
        className="SearchDialog__modal"
        onDidDismiss={() => {
          onDissmissed();
        }}
      >
        {!isDesktop() && (
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
        )}
        <IonContent className="ion-padding">
          <Search className="SearchDialog__input" innerRef={searchRef} {...searchProps}></Search>
          {React.isValidElement(children) && React.cloneElement(children, { modal })}
        </IonContent>
      </IonModal>
    </section>
  );
}

export default SearchDialog;
