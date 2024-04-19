import { RouteProps as ReactRouteProps } from "react-router";

export interface ProtectedRouteProps extends ReactRouteProps {
  redirectUrlIfLoggedIn?: string;
  redirectIfLoggedIn?: boolean;
  redirectUrlIfUnauthorized?: string;
  scopeName?: string;
}
