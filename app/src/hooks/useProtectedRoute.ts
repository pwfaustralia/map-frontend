import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import useSWR, { useSWRConfig } from "swr";
import { useUserData } from "../services/queries";
import { ProtectedRouteProps } from "../types/props";
import StoreModel from "../types/store";

export function useProtectedRoute(props: ProtectedRouteProps) {
  const { scopeName, redirectUrlIfUnauthorized, redirectIfLoggedIn } = props;
  const { isLoggedIn } = useStoreState<StoreModel>((states) => states.user);
  const { data: userData, isLoading: isUserDataLoading } = useUserData(isLoggedIn, true);
  const { data: redirectUrl = "/login", isLoading: isUserPermissionsLoading } = useSWR(
    userData ? "user-permissions-" + props.path : null,
    ([]) =>
      new Promise((resolve) => {
        if (userData) {
          let redirectUrl: string | null = null;

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
          setTimeout(() => {
            resolve(redirectUrl);
          }, 2000);
        }
      }),
    {
      suspense: true,
    }
  );
  const [isLoading, setIsloading] = useState(isUserPermissionsLoading || isUserDataLoading);
  const { cache } = useSWRConfig();
  const location = useLocation();

  useEffect(() => {
    let cacheExists = cache.get("user-permissions-" + location.pathname);
    if (cacheExists) {
      setIsloading(false);
      return;
    }
    if (props.path) {
      if (location.pathname !== props.path) {
        setIsloading(true);
      } else {
        setIsloading(isUserPermissionsLoading || isUserDataLoading);
      }
    } else {
      // path not found
      setIsloading(false);
    }
  }, [location, isUserPermissionsLoading, isUserDataLoading, cache]);

  return { userData, isLoading, isUserDataLoading, isUserPermissionsLoading, redirectUrl, isLoggedIn };
}
