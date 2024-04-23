import { useIonToast } from "@ionic/react";
import { Suspense, useEffect, useMemo } from "react";
import { Route as ReactRoute, Redirect } from "react-router";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import { ProtectedRouteProps } from "../../types/props";

const publicPaths = ["/login"];

function Route(props: ProtectedRouteProps) {
  return (
    <ReactRoute {...props}>
      <Suspense fallback={<h2>Loading page...</h2>}>
        <ProtectedRoute {...props}>{props.children}</ProtectedRoute>
      </Suspense>
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

  useEffect(() => {
    if (!isLoading) {
      if (isUnauthenticated) {
        showMessage("Please log in to continue.", "top");
      } else if (isUnauthorized) {
        showMessage("You don't have permissions to view this resource.", "top");
      }
    }
  }, [isLoading, isUnauthenticated, isUnauthorized]);

  const showMessage = (message: string, position: "top" | "middle" | "bottom") => {
    present({
      message,
      duration: 1500,
      position: position,
    });
  };

  if (isLoading) {
    return <></>;
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
