import { Suspense } from "react";
import { Route as ReactRoute } from "react-router";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { ProtectedRouteProps } from "../types/props";

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
  const { isLoggedIn } = useProtectedRoute(props);

  if (!isLoggedIn && !publicPaths.includes(props.path + "")) return <></>;

  return <>{props.children}</>;
}

export default Route;
