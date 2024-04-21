import { useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useHistory } from "react-router";
import useSWR from "swr";
import { useUserData } from "../services/queries";
import { ProtectedRouteProps } from "../types/props";
import StoreModel from "../types/store";
import useLogoutUser from "./useLogoutUser";

export function useProtectedRoute(props: ProtectedRouteProps) {
  const { scopeName, redirectUrlIfUnauthorized, redirectIfLoggedIn } = props;
  const { isLoggedIn } = useStoreState<StoreModel>((states) => states.user);
  const { logoutUser } = useLogoutUser();
  const { data: userData, isLoading } = useUserData(isLoggedIn, true);
  const history = useHistory();

  useSWR(
    userData ? "user-permissions" : null,
    ([]) =>
      new Promise((resolve) => {
        if (userData) {
          let redirectUrl = null;

          if (redirectIfLoggedIn && userData?.default_page) {
            redirectUrl = userData.default_page;
          }

          if (scopeName) {
            if (userData.user_role.role_permissions.findIndex((q: any) => q.scope_name === scopeName) < 0) {
              if (redirectUrlIfUnauthorized) {
                redirectUrl = redirectUrlIfUnauthorized;
              } else if (userData?.default_page) {
                redirectUrl = userData.default_page;
              }
            }
          }
          resolve(redirectUrl);
        }
      }),
    {
      suspense: true,
      onSuccess: (data) => {
        if (data) {
          history.replace(data);
        }
      },
    }
  );

  useEffect(() => {
    if (!isLoading && !userData) {
      logoutUser();
    }
  }, [isLoading]);

  return { userData, isLoading, isLoggedIn };
}
