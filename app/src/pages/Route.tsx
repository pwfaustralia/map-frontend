import { useIonToast } from "@ionic/react";
import { useStoreActions } from "easy-peasy";
import { Suspense, useEffect, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route as ReactRoute, Redirect } from "react-router";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { ProtectedRouteProps } from "../types/props";
import StoreModel from "../types/store";
import PageError from "./PageError";
import PageLoading from "./PageLoading";

const publicPaths = ["/login"];

function Route(props: ProtectedRouteProps) {
  const logoutUser = useStoreActions<StoreModel>((actions) => actions.user.logout);
  return (
    <ReactRoute {...props}>
      <ErrorBoundary
        fallback={<PageError />}
        onError={() => {
          setTimeout(() => {
            logoutUser();
          }, 3000);
        }}
      >
        <Suspense fallback={<PageLoading />}>
          <ProtectedRoute {...props}>{props.children}</ProtectedRoute>
        </Suspense>
      </ErrorBoundary>
    </ReactRoute>
  );
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const { isLoading, redirectUrl, isLoggedIn } = useProtectedRoute(props);
  const [present] = useIonToast();

  const isUnauthorized = useMemo(
    () => redirectUrl && !publicPaths.includes(props.path + ""),
    [redirectUrl, props.path]
  );
  const isUnauthenticated = useMemo(() => !isLoggedIn, [isLoggedIn]);

  const showMessage = (message: string, position: "top" | "middle" | "bottom") => {
    present({
      message,
      duration: 1500,
      position: position,
    });
  };

  useEffect(() => {
    if (!isLoading) {
      if (isUnauthenticated) {
        showMessage("Please log in to continue.", "top");
      } else if (isUnauthorized) {
        showMessage("You don't have permissions to view this resource.", "top");
      }
    }
  }, [isLoading, isUnauthenticated, isUnauthorized]);

  if (isLoading) {
    return <PageLoading />;
  }

  if (isUnauthenticated && props.path !== "/login") {
    return <Redirect to="/login" />;
  }

  if (isUnauthorized && redirectUrl) {
    return <Redirect to={redirectUrl} />;
  }

  return <>{props.children}</>;
}

export default Route;
