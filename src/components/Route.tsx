import { useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { Route as ReactRoute, useHistory } from "react-router";
import StoreModel from "../lib/easy-peasy/models";

interface RouteProps {
  exact: boolean | undefined;
  path: string;
  children: JSX.Element;
}

function Route(props: RouteProps) {
  const isLoggedIn = useStoreState<StoreModel>((states) => states.user.isLoggedIn);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.replace("/login");
    } else {
      history.replace("/clients");
    }
  }, []);

  return <ReactRoute {...props}>{props.children}</ReactRoute>;
}

export default Route;
