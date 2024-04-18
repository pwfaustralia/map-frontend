import { useStoreState } from "easy-peasy";
import { Route as ReactRoute, useHistory } from "react-router";
import useSWR from "swr";
import StoreModel from "../lib/easy-peasy/models";
import { Suspense, useEffect, useState } from "react";

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
  return (
    <ReactRoute {...props}>
      <Suspense fallback={<h3>Loading content...</h3>}>
        <RouteContent {...props}>{props.children}</RouteContent>
      </Suspense>
    </ReactRoute>
  );
}

function RouteContent(props: RouteProps) {
  const { scopeName, redirectUrlIfUnauthorized, redirectIfLoggedIn } = props;
  const { isLoggedIn, userPermissions, userData } = useStoreState<StoreModel>((states) => states.user);
  const history = useHistory();
  useSWR(
    ["getUserPermissions"],
    ([]) =>
      new Promise((resolve) => {
        let redirectUrl = null;
        if (!isLoggedIn) {
          redirectUrl = "/login";
        } else {
          if (redirectIfLoggedIn && userData?.default_page) {
            redirectUrl = userData.default_page;
          }
        }

        if (scopeName) {
          if (userPermissions.findIndex((q: any) => q.scope_name === scopeName) < 0) {
            if (redirectUrlIfUnauthorized) {
              redirectUrl = redirectUrlIfUnauthorized;
            } else if (userData?.default_page) {
              redirectUrl = userData.default_page;
            }
          }
        }

        resolve(redirectUrl);
      }),
    {
      suspense: true,
      onSuccess(data) {
        if (data) history.replace(data);
      },
    }
  );
  return <>{props.children}</>;
}

export default Route;
