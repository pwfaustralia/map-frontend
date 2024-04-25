import { Link as RouterLink } from "react-router-dom";
import { ComponentProps, ReactNode } from "react";
import "./Link.scss";

interface LinkProps extends ComponentProps<typeof RouterLink> {
  innerRef?: any;
  children: ReactNode;
}

function Link(props: LinkProps) {
  const { className, innerRef, ...linkProps } = props;

  return (
    <RouterLink {...linkProps} className={[className || "", "c-link"].join(" ")} ref={innerRef}>
      {props.children}
    </RouterLink>
  );
}

export default Link;
