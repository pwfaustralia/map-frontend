import { useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { Route as ReactRoute, useHistory } from "react-router";
import StoreModel from "../lib/easy-peasy/models";

interface RouteProps {
  exact: boolean | undefined;
  path: string;
  children: JSX.Element;
  redirectUrlIfLoggedIn?: string;
}

function Route(props: RouteProps) {
  const isLoggedIn = useStoreState<StoreModel>((states) => states.user.isLoggedIn);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.replace("/login");
    } else if (props.redirectUrlIfLoggedIn) {
      history.replace(props.redirectUrlIfLoggedIn);
    }
  }, []);

  return <ReactRoute {...props}>{props.children}</ReactRoute>;
}

export default Route;
