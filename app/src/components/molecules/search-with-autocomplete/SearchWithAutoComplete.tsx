import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  createAnimation,
} from "@ionic/react";
import { useRef, type ComponentProps } from "react";

import Search from "../../atoms/search/Search";
import "./SearchWithAutoComplete.scss";
import { isDesktop } from "../../../helpers";

interface InputWithLabelProps extends ComponentProps<typeof Search> {
  triggerLabel?: string;
}

function SearchWithAutoComplete(props: InputWithLabelProps) {
  const searchRef = useRef<HTMLIonSearchbarElement>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const { triggerLabel, ...searchProps } = props;
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
    <section className="SearchWithAutoComplete">
      <Search
        onClick={() => {
          modal.current?.present();
        }}
        className="SearchWithAutoComplete__trigger"
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
          <Search className="SearchWithAutoComplete__input" innerRef={searchRef} {...searchProps}></Search>
          <IonList>
            <IonListHeader>
              <IonLabel>Video Games</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>Pokémon Yellow</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Mega Man X</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>The Legend of Zelda</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Pac-Man</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Super Mario World</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    </section>
  );
}

export default SearchWithAutoComplete;
