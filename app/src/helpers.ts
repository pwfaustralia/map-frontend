import { getPlatforms } from "@ionic/react";

function revalidation(revalidation: boolean) {
  return {
    revalidateOnFocus: revalidation,
    revalidateOnReconnect: revalidation,
    refreshWhenOffline: revalidation,
    refreshWhenHidden: revalidation,
    ...(revalidation ? {} : { refreshInterval: 0 }),
  };
}

export function disableRevalidation() {
  return revalidation(false);
}

export function enableRevalidation() {
  return revalidation(true);
}

export function isDesktop() {
  return getPlatforms().indexOf("desktop") >= 0;
}

export const routes = {
  common: {
    login: "/login",
  },
  AS: {
    clients: "/clients",
  },
  C: {
    dashboard: "/dashboard",
  },
};
