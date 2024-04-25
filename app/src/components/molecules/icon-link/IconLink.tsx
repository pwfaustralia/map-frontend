import { IonIcon } from "@ionic/react";
import type { ComponentProps } from "react";
import { useLocation } from "react-router";
import Link from "../../atoms/link/Link";
import "./IconLink.scss";

interface IconLinkProps extends ComponentProps<typeof Link> {
  innerRef?: any;
  icon?: string;
  additionalClass?: string;
  focusOnVisit?: boolean;
}

function IconLink(props: IconLinkProps) {
  const { innerRef, className, icon, additionalClass, focusOnVisit = true, ...iconLinkProps } = props;
  const location = useLocation();

  return (
    <Link
      {...iconLinkProps}
      innerRef={innerRef}
      className={[
        className || "",
        "c-icon-link",
        focusOnVisit && location.pathname === props.to ? "c-icon-link__active" : null,
        additionalClass,
      ]
        .filter((q) => !!q)
        .join(" ")}
    >
      <>
        {icon && <IonIcon icon={icon} color="primary" size="large"></IonIcon>}
        {props.children}
      </>
    </Link>
  );
}

export default IconLink;
