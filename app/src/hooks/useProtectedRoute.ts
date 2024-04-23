import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { useUserData } from "../services/queries";
import { ProtectedRouteProps } from "../types/props";
import StoreModel from "../types/store";
import useLogoutUser from "./useLogoutUser";

export function useProtectedRoute(props: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const { scopeName, redirectUrlIfUnauthorized, redirectIfLoggedIn } = props;
  const { isLoggedIn } = useStoreState<StoreModel>((states) => states.user);
  const { logoutUser } = useLogoutUser();
  const { data: userData, isLoading: isUserDataLoading } = useUserData(isLoggedIn, {
    suspense: true,
    onError: (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
    },
  });

  const getRedirectUrl = () => {
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
      return redirectUrl;
    }
    return null;
  };

  useEffect(() => {
    if (userData) {
      setIsLoading(true);
      setRedirectUrl(getRedirectUrl());
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [isUserDataLoading]);

  return { userData, isLoading, isUserDataLoading, redirectUrl, isLoggedIn };
}
