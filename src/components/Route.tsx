import { Store, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { Route as ReactRoute, useHistory } from "react-router";
import StoreModel from "../lib/easy-peasy/models";
import useSWR from "swr";

interface RouteProps {
  exact?: boolean | undefined;
  path?: string;
  children: JSX.Element;
  redirectUrlIfLoggedIn?: string;
  redirectIfLoggedIn?: boolean;
  redirectUrlIfUnauthorized?: string;
  scopeName?: string;
}

function Route(props: RouteProps) {
  const { redirectUrlIfLoggedIn = "", scopeName, redirectUrlIfUnauthorized, redirectIfLoggedIn } = props;
  const { isLoggedIn, userPermissions, userData } = useStoreState<StoreModel>((states) => states.user);
  const history = useHistory();

  useSWR(
    ["getUserPermissions"],
    ([]) =>
      new Promise((resolve) => {
        if (!isLoggedIn) {
          history.replace("/login");
        } else {
          if (redirectIfLoggedIn && userData?.default_page) {
            history.replace(userData.default_page);
          }
        }

        if (scopeName) {
          if (userPermissions.findIndex((q: any) => q.scope_name === scopeName) < 0) {
            if (redirectUrlIfUnauthorized) {
              history.replace(redirectUrlIfUnauthorized);
            } else if (userData?.default_page) {
              history.replace(userData.default_page);
            }
          }
        }

        resolve(true);
      }),
    {
      suspense: true,
    }
  );

  return <ReactRoute {...props}>{props.children}</ReactRoute>;
}

export default Route;
